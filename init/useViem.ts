import { useMemo } from 'react';
import { Address, createPublicClient, http } from 'viem';
import { createPaymasterClient, entryPoint06Address, paymasterActions } from 'viem/account-abstraction';
import { createSmartAccountClient } from 'permissionless';
import { base } from 'viem/chains';
import { rpcUrl, pimilcoRPCURL, bundlerUrl } from '@/constants/env';
import useSystemFunctions from '@/hooks/useSystemFunctions';
import { useAuth } from '@/providers';
// import { createPimlicoClient } from 'permissionless/clients/pimlico';

export function useClients() {
  const { smartAccountState } = useSystemFunctions();
  const { session } = useAuth();

  const account = smartAccountState.address as Address;

  const publicClient = useMemo(
    () =>
      createPublicClient({
        chain: base,
        transport: http(rpcUrl),
      }),
    []
  );

  const paymaster = createPaymasterClient({
    transport: http(pimilcoRPCURL),
  }).extend(paymasterActions);

  // const pimlicoClient = createPimlicoClient({
  //   chain: base,
  //   entryPoint: {
  //     address: entryPoint06Address,
  //     version: '0.6',
  //   },
  //   transport: http(pimilcoRPCURL),
  // });

  const smartAccountClient = useMemo(() => {
    if (!account) return null;
    return createSmartAccountClient({
      account: session!,
      chain: base,
      bundlerTransport: http(pimilcoRPCURL),
      paymaster,
    });
  }, [account, paymaster]);

  return {
    publicClient,
    paymaster,
    smartAccountClient,
  };
}
