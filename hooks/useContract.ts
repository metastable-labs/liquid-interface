import { Address, formatUnits, PublicClient } from 'viem';
import { AerodromePoolABI, LPSugarABI, OffchainOracleABI } from '@/constants/abis';
import { USDC_ADDRESS, WETH_ADDRESS } from '@/constants/addresses';

const { LpSugar } = LPSugarABI;
const { OffchainOracle } = OffchainOracleABI;

export function useLpSugarContract(address: Address, publicClient: PublicClient) {
  if (!LpSugar || !address || !publicClient) {
    throw new Error('Required parameters not provided to useLpSugarContract');
  }

  const SAFE_BATCH_SIZE = 1000;

  return {
    async getAll(limit: number, offset: number) {
      // Ensure limit is within safe bounds
      const safeBatchSize = Math.min(limit, SAFE_BATCH_SIZE);

      return await publicClient.readContract({
        address,
        abi: LpSugar.abi,
        functionName: 'all',
        args: [BigInt(safeBatchSize), BigInt(offset)],
      });
    },

    async getPositions(limit: number, offset: number, account: Address) {
      return publicClient.readContract({
        address,
        abi: LpSugar.abi,
        functionName: 'positions',
        args: [BigInt(limit), BigInt(offset), account],
      });
    },

    async getTokens(limit: number, offset: number, account: Address, connectors: readonly Address[]): Promise<any> {
      return publicClient.readContract({
        address,
        abi: LpSugar.abi,
        functionName: 'tokens',
        args: [BigInt(limit), BigInt(offset), account, connectors],
      });
    },
  };
}

export function useAerodromePoolContract(address: Address, publicClient: PublicClient) {
  if (!AerodromePoolABI || !address || !publicClient) {
    throw new Error('Required parameters not provided to useAerodromePoolContract');
  }

  return {
    async getStable() {
      return publicClient.readContract({
        address,
        abi: AerodromePoolABI,
        functionName: 'stable',
        args: [],
      }) as Promise<boolean>;
    },
  };
}

export function useOffchainOracleContract(address: Address, publicClient: PublicClient) {
  const BATCH_SIZE = 10;
  return {
    async getRateToUSD(tokenAddresses: Address[], tokenDecimals: number[], useWrappers: boolean): Promise<string[]> {
      const nonUsdcAddresses = tokenAddresses.filter((addr) => addr.toLowerCase() !== USDC_ADDRESS.toLowerCase());

      if (nonUsdcAddresses.length === 0) {
        return tokenAddresses.map((addr) => (addr.toLowerCase() === USDC_ADDRESS.toLowerCase() ? '1' : '0'));
      }

      // First get ETH/USDC rate (returns in 6 decimals since USDC is 6 decimals)
      const ethUsdcContract = {
        address,
        abi: OffchainOracle.abi,
        functionName: 'getRate',
        args: [WETH_ADDRESS, USDC_ADDRESS, useWrappers] as const,
      };

      // Then get token/ETH rates for all tokens (returns in 18 decimals)
      const tokenEthContracts = nonUsdcAddresses.map((tokenAddress) => ({
        address,
        abi: OffchainOracle.abi,
        functionName: 'getRateToEth',
        args: [tokenAddress, useWrappers] as const,
      }));

      const results = await publicClient.multicall({
        contracts: [ethUsdcContract, ...tokenEthContracts] as any[],
      });

      const [ethUsdcResult, ...tokenEthResults] = results;

      if (ethUsdcResult.status !== 'success') return tokenAddresses.map(() => '0');
      const ethUsdcRate = ethUsdcResult.result as bigint;

      return tokenAddresses.map((addr, i) => {
        if (addr.toLowerCase() === USDC_ADDRESS.toLowerCase()) {
          return '1';
        }

        const index = nonUsdcAddresses.findIndex((nonUsdcAddr) => nonUsdcAddr.toLowerCase() === addr.toLowerCase());

        if (index === -1) return '0';

        const result = tokenEthResults[index];
        if (result.status !== 'success') return '0';

        const tokenEthRate = result.result as bigint;

        // For 6 decimal tokens, we need to adjust the calculation
        if (tokenDecimals[i] === 6) {
          // Adjust for 6 decimal tokens:
          // (tokenEthRate * ethUsdcRate) / (1e18 * 1e12)
          const tokenUsdcRate = (tokenEthRate * ethUsdcRate) / BigInt(1e30);
          return formatUnits(tokenUsdcRate, 6);
        }

        // For 18 decimal tokens:
        // (tokenEthRate * ethUsdcRate) / 1e18
        const tokenUsdcRate = (tokenEthRate * ethUsdcRate) / BigInt(1e18);
        return formatUnits(tokenUsdcRate, 6);
      });
    },

    async getRateToUSDBatched(tokenAddresses: Address[], useWrappers: boolean): Promise<bigint[]> {
      // Filter out USDC addresses
      const nonUsdcAddresses = tokenAddresses.filter((addr) => addr.toLowerCase() !== USDC_ADDRESS.toLowerCase());

      // If there are no non-USDC addresses, return early
      if (nonUsdcAddresses.length === 0) {
        return tokenAddresses.map((addr) => (addr.toLowerCase() === USDC_ADDRESS.toLowerCase() ? BigInt(1) : BigInt(0)));
      }

      // Split into batches
      const batches = Array.from({ length: Math.ceil(nonUsdcAddresses.length / BATCH_SIZE) }, (_, i) =>
        nonUsdcAddresses.slice(i * BATCH_SIZE, (i + 1) * BATCH_SIZE)
      );

      // Process all batches
      const batchResults = await Promise.all(
        batches.map(async (batch) => {
          const contracts = batch.map((tokenAddress) => ({
            address,
            abi: OffchainOracleABI,
            functionName: 'getRate',
            args: [tokenAddress, USDC_ADDRESS, useWrappers] as const,
          }));

          return publicClient.multicall({
            contracts: contracts as any[], // Type assertion needed due to viem typing limitations
          });
        })
      );

      // Flatten batch results
      const flatResults = batchResults.flat();

      // Map results back to original token array order
      return tokenAddresses.map((addr) => {
        if (addr.toLowerCase() === USDC_ADDRESS.toLowerCase()) {
          return BigInt(1);
        }
        const index = nonUsdcAddresses.findIndex((nonUsdcAddr) => nonUsdcAddr.toLowerCase() === addr.toLowerCase());
        if (index === -1) return BigInt(0);

        const result = flatResults[index];
        return result.status === 'success' ? (result.result as bigint) : BigInt(0);
      });
    },
  };
}
