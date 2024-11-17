import { pimilcoRPCURL, rpcUrl } from '@/constants/env';
import { createPublicClient, http } from 'viem';
import { createBundlerClient, createPaymasterClient, paymasterActions } from 'viem/account-abstraction';
import { base } from 'viem/chains';

export const publicClient = createPublicClient({
  chain: base,
  transport: http(rpcUrl),
});

export const bundlerClient = createBundlerClient({
  transport: http(pimilcoRPCURL),
}).extend(paymasterActions);
