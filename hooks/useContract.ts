import { useMemo } from 'react';
import { PublicClient, Abi } from 'viem';

// Helper types
type ExtractAbiFunctionNames<TAbi extends Abi | readonly unknown[]> = TAbi extends Abi
  ? Extract<TAbi[number], { type: 'function' }>['name']
  : string;

type ExtractAbiFunctionArgs<TAbi extends Abi | readonly unknown[], TFunctionName extends string> = TAbi extends Abi
  ? Extract<TAbi[number], { type: 'function'; name: TFunctionName }>['inputs']
  : unknown[];

type ReadContractResult<TAbi extends Abi | readonly unknown[], TFunctionName extends string> = TAbi extends Abi
  ? Extract<TAbi[number], { type: 'function'; name: TFunctionName }>['outputs'][number]
  : unknown;

type ContractMethods<TAbi extends Abi | readonly unknown[]> = {
  read: <TFunctionName extends ExtractAbiFunctionNames<TAbi>>(
    functionName: TFunctionName,
    args: ExtractAbiFunctionArgs<TAbi, TFunctionName>
  ) => Promise<ReadContractResult<TAbi, TFunctionName>>;
};

export function useContract<TAbi extends Abi | readonly unknown[]>(
  address: any,
  abi: any,
  publicClient: PublicClient
): ContractMethods<TAbi> {
  return useMemo(() => {
    const read: ContractMethods<TAbi>['read'] = async (functionName, args) => {
      return publicClient.readContract({
        address,
        abi,
        functionName,
        args,
      }) as Promise<ReadContractResult<TAbi, typeof functionName>>;
    };

    return {
      read,
    };
  }, [address, abi, publicClient]);
}
