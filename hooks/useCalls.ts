import { Address, encodeFunctionData, Hex } from 'viem';
import { buildUserOp, getPaymasterData, getUserOpHash } from '@/utils/wallet';
import { Call } from '@/utils/types';
import { entryPoint06Address } from 'viem/account-abstraction';
import { paymasterClient, bundlerClient } from '@/init/viem';
import { useSmartAccountActions } from '@/store/smartAccount/actions';
import { SmartWalletABI } from '@/constants/abis';
import { ENTRYPOINT_V06_ADDRESS } from '@/constants/addresses';
import { useCallback } from 'react';

export function useMakeCalls() {
  const { signTransaction } = useSmartAccountActions();

  const makeCalls = useCallback(
    async ({ calls, account }: { calls: Call[]; account: Address }) => {
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

      const signature = await signTransaction(hash);

      op.signature = signature!;

      // Send the user operation
      const opHash = await bundlerClient.sendUserOperation({
        userOperation: op,
        entryPoint: entryPoint06Address,
      });

      return {
        opHash,
        userOpHash: hash,
      };
    },
    [signTransaction]
  );

  const buildUserOperationCalldata = useCallback(({ calls }: { calls: Call[] }): Hex => {
    // sort ascending order, 0 first
    const _calls = calls.sort((a, b) => a.index - b.index);
    return encodeFunctionData({
      abi: SmartWalletABI,
      functionName: 'executeBatch',
      args: [_calls],
    });
  }, []);

  return {
    makeCalls,
    buildUserOperationCalldata,
  };
}
