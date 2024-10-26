import { Address, ContractFunctionExecutionError, formatUnits, PublicClient } from 'viem';
import { LpSugar } from '@/constants/abis/LPSugar';
import { AerodromePool } from '@/constants/abis/AerodromePoolABI';
import { OffchainOracle } from '@/constants/abis/OffchainOracle';
import { USDC_ADDRESS } from '@/constants/addresses';
import { createRateLimitedContract } from '@/utils/rateLimit';

export function useLpSugarContract(address: Address, publicClient: PublicClient) {
  if (!LpSugar.abi || !address || !publicClient) {
    throw new Error('Required parameters not provided to useLpSugarContract');
  }

  const SAFE_BATCH_SIZE = 100;

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

    async getTokens(limit: number, offset: number, account: Address, connectors: readonly Address[]) {
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
  if (!AerodromePool.abi || !address || !publicClient) {
    throw new Error('Required parameters not provided to useAerodromePoolContract');
  }

  return {
    async getStable() {
      return publicClient.readContract({
        address,
        abi: AerodromePool.abi,
        functionName: 'stable',
        args: [],
      }) as Promise<boolean>;
    },
  };
}

export function useOffchainOracleContract(address: Address, publicClient: PublicClient) {
  const BATCH_SIZE = 50;
  return {
    async getRateToUSD(tokenAddresses: Address[], useWrappers: boolean): Promise<bigint[]> {
      // Filter out USDC addresses
      const nonUsdcAddresses = tokenAddresses.filter((addr) => addr.toLowerCase() !== USDC_ADDRESS.toLowerCase());

      // If there are no non-USDC addresses, return early
      if (nonUsdcAddresses.length === 0) {
        return tokenAddresses.map((addr) => (addr.toLowerCase() === USDC_ADDRESS.toLowerCase() ? BigInt(1) : BigInt(0)));
      }

      // Prepare multicall contracts array
      const contracts = nonUsdcAddresses.map((tokenAddress) => ({
        address,
        abi: OffchainOracle.abi,
        functionName: 'getRate',
        args: [tokenAddress, USDC_ADDRESS, useWrappers] as const,
      }));

      // Execute multicall with proper typing
      const results = await publicClient.multicall({
        contracts: contracts as any[], // Type assertion needed due to viem typing limitations
      });

      // Map results back to original token array order
      return tokenAddresses.map((addr) => {
        if (addr.toLowerCase() === USDC_ADDRESS.toLowerCase()) {
          return BigInt(1);
        }
        const index = nonUsdcAddresses.findIndex((nonUsdcAddr) => nonUsdcAddr.toLowerCase() === addr.toLowerCase());
        if (index === -1) return BigInt(0);

        const result = results[index];
        return result.status === 'success' ? (result.result as bigint) : BigInt(0);
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
            abi: OffchainOracle.abi,
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
