import { createPublicClient, http } from 'viem';
import { createBundlerClient } from 'viem/account-abstraction';
import { base } from 'viem/chains';

import { rpcUrl, bundlerUrl } from '@/constants/env';

export const publicClient = createPublicClient({
  chain: base,
  transport: http(rpcUrl),
});

export const bundlerClient = createBundlerClient({
  client: publicClient,
  transport: http(bundlerUrl),
  paymaster: true,
});
