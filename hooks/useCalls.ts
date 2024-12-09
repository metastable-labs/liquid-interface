import { Address, encodeFunctionData, Hex } from 'viem';
import {
  buildUserOp,
  getOwnerIndex,
  getPaymasterData,
  getUserOpHash,
  PASSKEY_OWNER_DUMMY_SIGNATURE,
  sendUserOperation,
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
import { bufferToHex, parseAndNormalizeSig } from '@/utils/base64';
import { splitSignature } from '@/utils/helpers';
import { pimilcoRPCURL } from '@/constants/env';
import { getRequiredPrefund } from 'permissionless';
import { bundlerClient, publicClient } from '@/init/client';

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

      //   const sponsoredData = await sponsorUserOperation({
      //     callData: op.callData,
      //     sender: op.sender,
      //     nonce: op.nonce,
      //     initCode: op.initCode,
      //     maxFeePerGas: BigInt(op.maxFeePerGas),
      //     maxPriorityFeePerGas: BigInt(op.maxPriorityFeePerGas),
      //     callGasLimit: op.callGasLimit,
      //     verificationGasLimit: op.verificationGasLimit,
      //     preVerificationGas: op.preVerificationGas,
      //     signature: PASSKEY_OWNER_DUMMY_SIGNATURE,
      //   });

      // Update operation with paymaster data
      //op.paymasterAndData = sponsoredData.paymasterAndData;
      const hash = getUserOpHash({
        chainId: BigInt(8453),
        userOperation: {
          sender: op.sender,
          nonce: op.nonce,
          initCode: op.initCode,
          callData: op.callData,
          callGasLimit: op.callGasLimit,
          verificationGasLimit: op.verificationGasLimit,
          preVerificationGas: op.preVerificationGas,
          maxFeePerGas: BigInt(op.maxFeePerGas),
          maxPriorityFeePerGas: BigInt(op.maxPriorityFeePerGas),
          paymasterAndData: '0x',
          signature: PASSKEY_OWNER_DUMMY_SIGNATURE,
        },
      });

      const signature = await signTransaction(hash);

      const { r, s } = parseAndNormalizeSig(signature.signature);

      const webAuthnSignatureFormat = buildWebAuthnSignature({
        ownerIndex: BigInt(0),
        authenticatorData: signature.webauthn.authenticatorData,
        clientDataJSON: signature.webauthn.clientDataJSON,
        r,
        s,
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
        maxFeePerGas: BigInt(op.maxFeePerGas),
        maxPriorityFeePerGas: BigInt(op.maxPriorityFeePerGas),
        paymasterAndData: op.paymasterAndData,
        signature: webAuthnSignatureFormat,
      };

      const requiredPrefund = getRequiredPrefund({ userOperation: signedOp, entryPointVersion: '0.6' });

      const senderBalance = await publicClient.getBalance({
        address: signedOp.sender,
      });

      if (senderBalance < requiredPrefund) {
        throw new Error(`Sender address does not have enough native tokens`);
      }

      // Send the user operation
      const opHash = await sendUserOperation(signedOp);

      const receipt = await smartAccountClient?.waitForUserOperationReceipt({ hash: opHash, timeout: 1000000 });
      console.log(receipt, 'receipt');
      return {
        opHash,
        userOpHash: hash,
        receipt,
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
