import { Address, encodeFunctionData, Hex } from 'viem';
import {
  buildUserOp,
  getOwnerIndex,
  getPaymasterData,
  getUserOpHash,
  PASSKEY_OWNER_DUMMY_SIGNATURE,
  sponsorUserOperation,
} from '@/utils/wallet';
import { Call } from '@/utils/types';
import { entryPoint06Abi, entryPoint06Address, getUserOperationHash, UserOperation } from 'viem/account-abstraction';
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
      const hash = getUserOperationHash({
        chainId: 8453,
        entryPointAddress: entryPoint06Address,
        entryPointVersion: '0.6',
        userOperation: {
          callData: op.callData,
          callGasLimit: op.callGasLimit,
          initCode: op.initCode,
          maxFeePerGas: op.maxFeePerGas,
          maxPriorityFeePerGas: op.maxPriorityFeePerGas,
          nonce: op.nonce,
          paymasterAndData: op.paymasterAndData,
          preVerificationGas: op.preVerificationGas,
          sender: op.sender,
          signature: '0x',
          verificationGasLimit: op.verificationGasLimit,
        },
      });

      const signature = await signTransaction(hash);

      const { r, s } = splitSignature(signature.signature);

      const webAuthnSignatureFormat = buildWebAuthnSignature({
        ownerIndex: BigInt(0),
        authenticatorData: signature.webauthn.authenticatorData,
        clientDataJSON: signature.webauthn.clientDataJSON,
        r: BigInt(r),
        s: BigInt(s),
      });

      console.log({
        authenticatorData: signature.webauthn.authenticatorData,
        clientDataJSON: signature.webauthn.clientDataJSON,
        r,
        s,
        finalSignature: webAuthnSignatureFormat,
      });

      // Create new operation object with signature
      const signedOp = {
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
        signature: webAuthnSignatureFormat,
        entryPoint06Address,
      };

      // Send the user operation
      const opHash = await smartAccountClient?.sendUserOperation(signedOp);

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
