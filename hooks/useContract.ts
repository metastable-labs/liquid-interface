import { Address, ContractFunctionExecutionError, PublicClient } from 'viem';
import { OffchainOracleABI } from '@/constants/abis';
import { LpSugar } from '@/constants/abis/LPSugar';
import { AerodromePool } from '@/constants/abis/AerodromePoolABI';

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
  if (!address || !publicClient) {
    throw new Error('Address and publicClient are required for OffchainOracleContract');
  }

  return {
    async getRate(tokenIn: Address, tokenOut: Address, useWrappers: boolean) {
      try {
        return await publicClient.readContract({
          address,
          abi: OffchainOracleABI,
          functionName: 'getRate',
          args: [tokenIn, tokenOut, useWrappers],
        });
      } catch (error) {
        if (error instanceof ContractFunctionExecutionError) {
          console.error('Contract execution error:', {
            function: 'getRate',
            args: [tokenIn, tokenOut, useWrappers],
            error: error.message,
            details: error.details,
          });
        }
        throw error;
      }
    },
  };
}
