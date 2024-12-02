import { Address, encodeFunctionData, Hex } from 'viem';
import { buildUserOp, getPaymasterData, getUserOpHash } from '@/utils/wallet';
import { Call } from '@/utils/types';
import { useClients } from '@/init/useViem';
import { useSmartAccountActions } from '@/store/smartAccount/actions';
import { SmartWalletABI } from '@/constants/abis';
import { useCallback } from 'react';
import { getPersistedSmartAccountInfo } from '@/store/smartAccount/persist';
import { ENTRYPOINT_V06_ADDRESS } from '@/constants/addresses';

export function useMakeCalls() {
  const { signTransaction } = useSmartAccountActions();
  const { paymaster, smartAccountClient } = useClients();

  const makeCalls = useCallback(
    async ({ calls, account }: { calls: Call[]; account: Address }) => {
      try {
        const { publicKey, credentialID } = await getPersistedSmartAccountInfo();

        // Build the user operation
        const op = await buildUserOp(account, smartAccountClient!, {
          calls,
          signers: [publicKey as Hex],
          paymasterAndData: '0x',
        });

        // Set the verification gas limit
        op.verificationGasLimit = 800000n;

        // Get paymaster data (optional)
        const paymasterResult = await getPaymasterData({
          paymasterClient: paymaster,
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

        // Update UserOp with the paymaster data
        op.paymasterAndData = paymasterResult.paymasterAndData;

        // Generate the UserOp hash
        const hash = getUserOpHash({
          userOperation: {
            sender: op.sender,
            nonce: op.nonce,
            initCode: op.initCode,
            callData: op.callData,
            callGasLimit: op.callGasLimit,
            verificationGasLimit: op.verificationGasLimit,
            preVerificationGas: op.preVerificationGas,
            maxFeePerGas: op.maxFeePerGas,
            maxPriorityFeePerGas: op.maxPriorityFeePerGas,
            paymasterAndData: op.paymasterAndData,
            signature: '0x',
          },
          chainId: 8543n, // Example chainId
        });

        // Sign the UserOp
        const signature = await signTransaction(hash);

        // Ensure the signature is valid
        if (!signature) throw new Error('Failed to sign UserOp');

        // Create the signed UserOp
        const signedOp = { ...op, signature: signature! };

        // Send the UserOp to the entry point for execution
        const opHash = await smartAccountClient?.sendUserOperation({
          account: smartAccountClient.account,
          callData: op.callData,
          initCode: op.initCode,
          nonce: op.nonce,
          maxFeePerGas: op.maxFeePerGas,
          maxPriorityFeePerGas: op.maxPriorityFeePerGas,
          callGasLimit: op.callGasLimit,
          verificationGasLimit: op.verificationGasLimit,
          preVerificationGas: op.preVerificationGas,
          paymasterAndData: op.paymasterAndData,
          signature: signedOp.signature,
        });

        return { opHash, userOpHash: hash };
      } catch (error) {
        console.error('Error in makeCalls:', error);
        throw new Error('Failed to send UserOp');
      }
    },
    [signTransaction, paymaster, smartAccountClient]
  );

  const buildUserOperationCalldata = useCallback(({ calls }: { calls: Call[] }): Hex => {
    const _calls = calls.sort((a, b) => a.index - b.index);

    return encodeFunctionData({
      abi: SmartWalletABI.smartWalletABI,
      functionName: 'executeBatch',
      args: [_calls],
    });
  }, []);

  return {
    makeCalls,
    buildUserOperationCalldata,
  };
}
