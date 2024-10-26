import { Address, ContractFunctionExecutionError, formatUnits, PublicClient } from 'viem';
import { LpSugar } from '@/constants/abis/LPSugar';
import { AerodromePool } from '@/constants/abis/AerodromePoolABI';
import { OffchainOracle } from '@/constants/abis/OffchainOracle';
import { USDC_ADDRESS } from '@/constants/addresses';

export function useLpSugarContract(address: Address, publicClient: PublicClient) {
  if (!LpSugar.abi || !address || !publicClient) {
    throw new Error('Required parameters not provided to useLpSugarContract');
  }

  const SAFE_BATCH_SIZE = 100;

  return {
    async getAll(limit: number, offset: number) {
      try {
        // Ensure limit is within safe bounds
        const safeBatchSize = Math.min(limit, SAFE_BATCH_SIZE);

        return await publicClient.readContract({
          address,
          abi: LpSugar.abi,
          functionName: 'all',
          args: [BigInt(safeBatchSize), BigInt(offset)],
        });
      } catch (error) {
        if (error instanceof ContractFunctionExecutionError) {
          console.error('Contract execution error:', {
            function: 'all',
            args: [limit, offset],
            error: error.message,
            details: error.details,
          });
        }
        throw error;
      }
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
      try {
        const safeBatchSize = Math.min(limit, SAFE_BATCH_SIZE);

        return await publicClient.readContract({
          address,
          abi: LpSugar.abi,
          functionName: 'tokens',
          args: [BigInt(safeBatchSize), BigInt(offset), account, connectors],
        });
      } catch (error) {
        if (error instanceof ContractFunctionExecutionError) {
          console.error('Contract execution error:', {
            function: 'tokens',
            args: [limit, offset, account, connectors],
            error: error.message,
            details: error.details,
          });
        }
        throw error;
      }
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
  return {
    async getRateToEth(tokenAddress: Address, useWrappers: boolean) {
      try {
        return await publicClient.readContract({
          address,
          abi: OffchainOracle.abi,
          functionName: 'getRateToEth',
          args: [tokenAddress, useWrappers],
        });
      } catch (error) {
        console.error('Error getting rate to ETH:', error);
        return BigInt(0);
      }
    },

    async getUsdPrice(tokenAddress: Address): Promise<string> {
      try {
        // If the token is USDC, return 1
        if (tokenAddress.toLowerCase() === USDC_ADDRESS.toLowerCase()) {
          return '1';
        }

        // First get token's rate to ETH
        const tokenToEthRate = await this.getRateToEth(tokenAddress, true);
        if (tokenToEthRate === BigInt(0)) return '0';

        // Then get ETH's rate to USDC
        const ethToUsdRate = await this.getRateToEth(USDC_ADDRESS, true);
        if (ethToUsdRate === BigInt(0)) return '0';

        // Calculate USD price:
        // tokenToEthRate is in 1e18 format
        // ethToUsdRate is in 1e6 format (USDC decimals)
        // We need to adjust for both decimals
        const priceInUsd = (tokenToEthRate * ethToUsdRate) / BigInt(1e18);
        return formatUnits(priceInUsd, 6);
      } catch (error) {
        console.error(`Error getting USD price for token ${tokenAddress}:`, error);
        return '0';
      }
    },
  };
}
