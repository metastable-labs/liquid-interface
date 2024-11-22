import { Address, encodeFunctionData, Hex } from 'viem';
import { buildUserOp, getPaymasterData, getUserOpHash } from '@/utils/wallet';
import { Call } from '@/utils/types';
import { entryPoint06Address } from 'viem/account-abstraction';
import { useClients } from '@/init/useViem';
import { useSmartAccountActions } from '@/store/smartAccount/actions';
import { SmartWalletABI } from '@/constants/abis';
import { ENTRYPOINT_V06_ADDRESS } from '@/constants/addresses';
import { useCallback } from 'react';
import { getPersistedSmartAccountInfo } from '@/store/smartAccount/persist';

export function useMakeCalls() {
  const { signTransaction } = useSmartAccountActions();
  const { paymaster, smartAccountClient } = useClients();

  const makeCalls = useCallback(
    async ({ calls, account }: { calls: Call[]; account: Address }) => {
      const { publicKey, credentialID } = await getPersistedSmartAccountInfo();

      // Build the user operation
      const op = await buildUserOp(account, smartAccountClient!, {
        calls,
        signers: [publicKey as Hex],
        paymasterAndData: '0x', // Initialize with empty paymaster data
      });

      // Set verification gas limit
      op.verificationGasLimit = 800000n;

      // Get paymaster data
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

      // Update operation with paymaster data
      op.paymasterAndData = paymasterResult.paymasterAndData;

      // Get the operation hash
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
        chainId: 8543n,
      });

      const signature = await signTransaction(hash);

      // Create new operation object with signature
      const signedOp = {
        ...op,
        signature: signature!,
      };

      // Send the user operation
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
