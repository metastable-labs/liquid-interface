import { Address, encodeFunctionData, Hex } from 'viem';
import { buildUserOp, getPaymasterData, getUserOpHash, sponsorUserOperation } from '@/utils/wallet';
import { Call } from '@/utils/types';
import { entryPoint06Address, UserOperation } from 'viem/account-abstraction';
import { useClients } from '@/init/useViem';
import { useSmartAccountActions } from '@/store/smartAccount/actions';
import { SmartWalletABI } from '@/constants/abis';
import { ENTRYPOINT_V06_ADDRESS } from '@/constants/addresses';
import { useCallback } from 'react';
import { getPersistedSmartAccountInfo } from '@/store/smartAccount/persist';
import { buildWebAuthnSignature } from '@/utils/signature';
import { bufferToHex } from '@/utils/base64';
import { splitSignature } from '@/utils/helpers';
import { pimilcoRPCURL } from '@/constants/env';

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

      const sponsoredData = await sponsorUserOperation({
        callData: op.callData,
        sender: op.sender,
        nonce: op.nonce,
        initCode: op.initCode,
        maxFeePerGas: op.maxFeePerGas,
        maxPriorityFeePerGas: op.maxPriorityFeePerGas,
        callGasLimit: op.callGasLimit,
        verificationGasLimit: op.verificationGasLimit,
        preVerificationGas: op.preVerificationGas,
        signature: '0x',
      });

      // Update operation with paymaster data
      op.paymasterAndData = sponsoredData.paymasterAndData;

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

      const { r, s } = splitSignature(signature.signature);

      const webAuthnSignatureFormat = buildWebAuthnSignature({
        ownerIndex: 0n,
        authenticatorData: signature.webauthn.authenticatorData,
        clientDataJSON: signature.webauthn.clientDataJSON,
        r: BigInt(r),
        s: BigInt(s),
      });

      // Create new operation object with signature
      const signedOp = {
        ...op,
        signature: webAuthnSignatureFormat!,
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
