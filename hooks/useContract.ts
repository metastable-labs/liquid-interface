import { useState, useEffect } from 'react';
import { Address, PublicClient, getContract } from 'viem';

export function useContract<TAbi extends readonly unknown[]>(address: Address, abi: TAbi, publicClient: PublicClient) {
  const [contract, setContract] = useState(() =>
    getContract({
      address,
      abi,
      client: publicClient,
    })
  );

  useEffect(() => {
    setContract(
      getContract({
        address,
        abi,
        client: publicClient,
      })
    );
  }, [address, abi, publicClient]);

  return contract;
}
