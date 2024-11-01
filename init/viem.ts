import { createPublicClient, http } from 'viem';
import { createPaymasterClient } from 'viem/account-abstraction';
import { estimateUserOperationGas, UserOperation, createBundlerClient } from 'permissionless';
import { base } from 'viem/chains';

import { rpcUrl, bundlerUrl } from '@/constants/env';

export const publicClient = createPublicClient({
  chain: base,
  transport: http(rpcUrl),
});

export const bundlerClient = createBundlerClient({
  chain: base,
  transport: http(bundlerUrl),
});

export const paymasterClient = createPaymasterClient({
  transport: http(bundlerUrl),
});
