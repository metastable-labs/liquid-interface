import { useMemo } from 'react';
import { Address, createPublicClient, http } from 'viem';
import { createPaymasterClient, entryPoint06Address } from 'viem/account-abstraction';
import { createPimlicoClient } from 'permissionless/clients/pimlico';
import { createSmartAccountClient } from 'permissionless';
import { base } from 'viem/chains';
import { rpcUrl, pimilcoRPCURL, bundlerUrl } from '@/constants/env';
import useSystemFunctions from '@/hooks/useSystemFunctions';

export function useClients() {
  const { smartAccountState } = useSystemFunctions();
  const account = smartAccountState.address as Address;

  const publicClient = useMemo(
    () =>
      createPublicClient({
        chain: base,
        transport: http(rpcUrl),
      }),
    []
  );

  const pimlicoClient = useMemo(
    () =>
      createPimlicoClient({
        transport: http(pimilcoRPCURL),
        entryPoint: {
          address: entryPoint06Address,
          version: '0.6',
        },
      }),
    []
  );

  const smartAccountClient = useMemo(() => {
    if (!account) return null;

    return createSmartAccountClient({
      account,
      chain: base,
      bundlerTransport: http(pimilcoRPCURL),
      paymaster: pimlicoClient,
      userOperation: {
        estimateFeesPerGas: async () => {
          return (await pimlicoClient.getUserOperationGasPrice()).fast;
        },
      },
    });
  }, [account, pimlicoClient]);

  return {
    publicClient,
    pimlicoClient,
    smartAccountClient,
  };
}
