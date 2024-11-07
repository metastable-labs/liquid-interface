import { Address, Hex } from 'viem';
import { buildUserOp, getPaymasterData, getUserOpHash } from './wallet';
import { Call } from './types';
import { entryPoint06Address } from 'viem/_types/account-abstraction';
import { paymasterClient, bundlerClient } from '@/init/viem';
import { useAuth } from '@/providers';

// Main function to execute calls
export async function makeCalls({ calls, account }: { calls: Call[]; account: Address }) {
  // Build the user operation
  const op = await buildUserOp(account, bundlerClient, {
    calls,
    paymasterAndData: '0x', // Initialize with empty paymaster data
  });

  // Set verification gas limit
  op.verificationGasLimit = 800000n;

  // Get paymaster data
  const paymasterResult = await getPaymasterData({
    paymasterClient: paymasterClient,
    callData: op.callData,
    sender: op.sender,
    nonce: op.nonce,
    initCode: op.initCode,
    maxFeePerGas: op.maxFeePerGas,
    maxPriorityFeePerGas: op.maxPriorityFeePerGas,
    callGasLimit: op.callGasLimit,
    verificationGasLimit: op.verificationGasLimit,
    preVerificationGas: op.preVerificationGas,
  });

  // Update operation with paymaster data
  op.paymasterAndData = paymasterResult.paymasterAndData;

  // Get the operation hash
  const hash = getUserOpHash({
    userOperation: op,
    chainId: 8543n,
  });

  // TODO: get smart wallet from reducer and sign the hash

  const signature =
    '0xc66a718123aa330c0d00439ed337bc6721c20298be9fb50bb0e8723b6340a7dc65bc37d891cb278953722d0a93f6daf784dde4e1396e8f57acc64c8d1ea9a602';

  op.signature = signature;

  // Send the user operation
  const opHash = await bundlerClient.sendUserOperation({
    userOperation: op,
    entryPoint: entryPoint06Address,
  });

  return {
    opHash,
    userOpHash: hash,
  };
}
