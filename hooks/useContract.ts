import { useMemo } from 'react';
import { Address, PublicClient, getContract } from 'viem';

export function useContract<TAbi extends readonly unknown[]>(address: Address, abi: TAbi, publicClient: PublicClient) {
  return useMemo(
    () =>
      getContract({
        address,
        abi,
        client: publicClient,
      }),
    [address, abi, publicClient]
  );
}
