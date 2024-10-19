import { createPublicClient, http } from 'viem';
import { createBundlerClient } from 'viem/account-abstraction';
import { base } from 'viem/chains';

const rpcUrl = 'https://mainnet.base.org';
const bundlerUrl = 'https://public.pimlico.io/v2/1/rpc';

export const publicClient = createPublicClient({
  chain: base,
  transport: http(rpcUrl),
});

export const bundlerClient = createBundlerClient({
  client: publicClient,
  transport: http(bundlerUrl),
  paymaster: true,
});
