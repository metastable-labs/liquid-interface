import { Address, PublicClient } from 'viem';
import { LPSugarABI, AerodromePoolABI, OffchainOracleABI } from '@/constants/abis';

export function useLpSugarContract(address: Address, publicClient: PublicClient) {
  if (!LPSugarABI || !address || !publicClient) {
    throw new Error('Required parameters not provided to useLpSugarContract');
  }

  return {
    async getAll(limit: number, offset: number) {
      return publicClient.readContract({
        address,
        abi: LPSugarABI,
        functionName: 'all',
        args: [BigInt(limit), BigInt(offset)],
      });
    },

    async getPositions(limit: number, offset: number, account: Address) {
      return publicClient.readContract({
        address,
        abi: LPSugarABI,
        functionName: 'positions',
        args: [BigInt(limit), BigInt(offset), account],
      });
    },

    async getTokens(limit: number, offset: number, account: Address, offchainOracleAddress: Address, connectors: Address[]) {
      return publicClient.readContract({
        address,
        abi: LPSugarABI,
        functionName: 'tokens',
        args: [BigInt(limit), BigInt(offset), account, offchainOracleAddress, connectors],
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
  return {
    async getRate(tokenIn: Address, tokenOut: Address, useWrappers: boolean) {
      return await publicClient.readContract({
        address,
        abi: OffchainOracleABI,
        functionName: 'getRate',
        args: [tokenIn, tokenOut, useWrappers],
      });
    },
  };
}
