import { EntryPointABI, SmartWalletABI } from '@/constants/abis';
import { ACCOUNT_FACTORY_ADDRESS, ENTRYPOINT_V06_ADDRESS } from '@/constants/addresses';
import { Address, Chain, encodeAbiParameters, encodeFunctionData, Hex, keccak256, PublicClient, Transport } from 'viem';
import { entryPoint06Abi, entryPoint06Address, estimateUserOperationGas, PaymasterClient, UserOperation } from 'viem/account-abstraction';
import { estimateFeesPerGas, getCode, readContract } from 'viem/actions';
import { Call, PaymasterResult } from './types';
import { SmartAccountClient } from 'permissionless';
import { bundlerClient, publicClient } from '@/init/client';
import { smartWalletFactoryAbi } from '@/constants/abis/SmartWalletFactory';
import { pimilcoRPCURL } from '@/constants/env';

export const PASSKEY_OWNER_DUMMY_SIGNATURE: Hex =
  '0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000001e0000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000c0000000000000000000000000000000000000000000000000000000000000012000000000000000000000000000000000000000000000000000000000000000170000000000000000000000000000000000000000000000000000000000000001538223f0722e30a69dd3e58944c551e4b0a6c1c51019696dd542e3eea0d7586943182f5516f91a4d772f3df63f967003da12065b459869481da33039cd3d931e00000000000000000000000000000000000000000000000000000000000000259701e811892f03ca71d8cdd5299d2e584e4f7454be49957d4ce3c66012c82d371d0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000767b2274797065223a22776562617574686e2e676574222c226368616c6c656e6765223a225636774e5059585376337a787952375171635f5a43316a5159673570374b36484a5847544b44774b5f4a67222c226f726967696e223a2268747470733a2f2f6170692e7573656c69717569642e78797a227d00000000000000000000';

// https://github.com/wilsoncusack/scw-tx/blob/5ff88a10e928b5df9ec12bce2ef64caa0b35afcd/utils/smartWallet.ts#L10
export async function buildUserOp(
  smartWalletAddress: Address,
  client: SmartAccountClient,
  {
    calls,
    signers,
    // If you want to sponsor user operations with a paymaster, pass in the response of the `pm_sponsorUserOperation` RPC
    // to your paymaster to the `paymasterAndData` param here: https://docs.pimlico.io/infra/paymaster/verifying-paymaster/endpoints#entrypoint-v06
    paymasterAndData = '0x',
  }: {
    calls: Call[];
    signers: Hex[];
    paymasterAndData: Hex;
  }
) {
  let initCode: Hex = '0x';
  console.log(initCode, 'got here');
  // `getBytecode` is imported from 'viem/actions'
  // Check if the smart wallet has been deployed by seeing if there's code at that address
  const code = await getCode(publicClient, { address: smartWalletAddress });

  // If not, set `initCode` to deploy the smart wallet using the helpers above
  if (!code || code === '0x') {
    console.log('Wallet not deployed, generating initCode');

    initCode = getInitCode({ owners: signers, index: 0n });
    console.log('Generated initCode:', initCode);
    console.log('Factory address used:', ACCOUNT_FACTORY_ADDRESS);
  }

  // Pass the transactions you want into the `buildUserOperationCalldata` helper from above to build the `callData` param for the user op
  const callData = buildUserOperationCalldata({ calls });
  // Get the smart wallet's `nonce` by calling the `getNonce` method on the entrypoint contract
  const nonce = await readContract(publicClient, {
    address: ENTRYPOINT_V06_ADDRESS,
    abi: entryPoint06Abi,
    functionName: 'getNonce',
    args: [smartWalletAddress, 0n],
  });
  // Get the current gas fees from the network
  let maxFeesPerGas = await estimateFeesPerGas(publicClient);

  // Increase gas limits for deployment
  const baseGasLimit = 1_000_000n;
  const deploymentBuffer = !code ? 3n : 1n; // Double gas limits for deployment

  // Put all the fields together in a user op
  const op = {
    sender: smartWalletAddress,
    nonce,
    initCode,
    callData,
    paymasterAndData,
    preVerificationGas: baseGasLimit * deploymentBuffer,
    verificationGasLimit: baseGasLimit * deploymentBuffer,
    callGasLimit: baseGasLimit * deploymentBuffer,
    ...maxFeesPerGas,
  };

  // Update user op specific gas limits like `preVerificationGas` etc.
  const gasLimits = await estimateUserOperationGas(client, {
    sender: op.sender,
    nonce: op.nonce,
    initCode: op.initCode,
    callData: op.callData,
    paymasterAndData: op.paymasterAndData,
    preVerificationGas: op.preVerificationGas,
    verificationGasLimit: op.verificationGasLimit,
    callGasLimit: op.callGasLimit,
    maxFeePerGas: op.maxFeePerGas,
    maxPriorityFeePerGas: op.maxPriorityFeePerGas,
    entryPointAddress: entryPoint06Address,
  });

  return {
    ...op,
    ...gasLimits,
  };
}

export function getInitCode({ owners, index }: { owners: Hex[]; index: bigint }): Hex {
  return `${ACCOUNT_FACTORY_ADDRESS}${createAccountCalldata({
    owners,
    nonce: index,
  }).slice(2)}`;
}

export function createAccountCalldata({ owners, nonce }: { owners: Hex[]; nonce: bigint }) {
  return encodeFunctionData({
    abi: smartWalletFactoryAbi,
    functionName: 'createAccount',
    args: [owners, nonce],
  });
}

export function buildUserOperationCalldata({ calls }: { calls: Call[] }): Hex {
  // sort ascending order, 0 first
  const _calls = calls.sort((a, b) => a.index - b.index);
  return encodeFunctionData({
    abi: SmartWalletABI.smartWalletABI,
    functionName: 'executeBatch',
    args: [_calls],
  });
}

export function getUserOpHash({ userOperation, chainId }: { userOperation: UserOperation; chainId: bigint }): Hex {
  const encodedUserOp = encodeAbiParameters(
    [
      { name: 'sender', type: 'address' },
      { name: 'nonce', type: 'uint256' },
      { name: 'initCode', type: 'bytes32' },
      { name: 'callData', type: 'bytes32' },
      { name: 'callGasLimit', type: 'uint256' },
      {
        name: 'verificationGasLimit',
        type: 'uint256',
      },
      {
        name: 'preVerificationGas',
        type: 'uint256',
      },
      { name: 'maxFeePerGas', type: 'uint256' },
      {
        name: 'maxPriorityFeePerGas',
        type: 'uint256',
      },
      { name: 'paymasterAndData', type: 'bytes32' },
    ],
    [
      userOperation.sender,
      userOperation.nonce,
      keccak256(userOperation.initCode ?? '0x'),
      keccak256(userOperation.callData),
      userOperation.callGasLimit,
      userOperation.verificationGasLimit,
      userOperation.preVerificationGas,
      userOperation.maxFeePerGas,
      userOperation.maxPriorityFeePerGas,
      keccak256(userOperation.paymasterAndData ?? '0x'),
    ]
  );
  const hashedUserOp = keccak256(encodedUserOp);
  const encodedWithChainAndEntryPoint = encodeAbiParameters(
    [
      { name: 'userOpHash', type: 'bytes32' },
      { name: 'entryPoint', type: 'address' },
      { name: 'chainId', type: 'uint256' },
    ],
    [hashedUserOp, entryPoint06Address, chainId]
  );
  return keccak256(encodedWithChainAndEntryPoint);
}
export const sponsorUserOperation = async (userOperation: {
  callData: any;
  sender: Address;
  nonce: bigint;
  initCode?: Hex;
  maxFeePerGas: bigint;
  maxPriorityFeePerGas: bigint;
  callGasLimit: bigint;
  verificationGasLimit: bigint;
  preVerificationGas: any;
  signature: Hex;
}) => {
  const userOperationData = {
    sender: userOperation.sender,
    nonce: `0x${BigInt(userOperation.nonce).toString(16)}`, // ensure hex
    initCode: userOperation.initCode,
    callData: userOperation.callData,
    callGasLimit: `0x${BigInt(userOperation.callGasLimit).toString(16)}`, // ensure hex
    verificationGasLimit: `0x${BigInt(userOperation.verificationGasLimit).toString(16)}`, // ensure hex
    preVerificationGas: `0x${BigInt(userOperation.preVerificationGas).toString(16)}`, // ensure hex
    maxPriorityFeePerGas: `0x${BigInt(userOperation.maxPriorityFeePerGas).toString(16)}`, // ensure hex
    maxFeePerGas: `0x${BigInt(userOperation.maxFeePerGas).toString(16)}`, // ensure hex
    signature: userOperation.signature,
  };
  const response = await fetch(pimilcoRPCURL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 1,
      method: 'pm_sponsorUserOperation',
      params: [
        {
          sender: userOperationData.sender,
          nonce: userOperationData.nonce,
          initCode: userOperationData.initCode,
          callData: userOperationData.callData,
          callGasLimit: userOperationData.callGasLimit, // Let Pimlico estimate
          verificationGasLimit: userOperationData.verificationGasLimit, // Let Pimlico estimate
          preVerificationGas: userOperationData.preVerificationGas, // Let Pimlico estimate
          maxPriorityFeePerGas: userOperationData.maxPriorityFeePerGas,
          maxFeePerGas: userOperationData.maxFeePerGas,
          paymasterAndData: '0x',
          signature: PASSKEY_OWNER_DUMMY_SIGNATURE,
        },
        ENTRYPOINT_V06_ADDRESS,
      ],
    }),
  });

  const sponsorResult = await response.json();
  if (sponsorResult.error) {
    throw new Error(`Sponsorship failed: ${sponsorResult.error.message}`);
  }

  return sponsorResult.result;
};

export async function getPaymasterData({
  paymasterClient,
  callData,
  sender,
  nonce,
  initCode = '0x',
  maxFeePerGas,
  maxPriorityFeePerGas,
  callGasLimit,
  verificationGasLimit,
  preVerificationGas,
  paymasterContext = {},
}: {
  paymasterClient: PaymasterClient;
  callData: Hex;
  sender: Address;
  nonce: bigint;
  initCode?: Hex;
  maxFeePerGas?: bigint;
  maxPriorityFeePerGas?: bigint;
  callGasLimit?: bigint;
  verificationGasLimit?: bigint;
  preVerificationGas?: bigint;
  paymasterContext?: Record<string, unknown>;
}): Promise<PaymasterResult> {
  try {
    const paymasterAndData = await paymasterClient.getPaymasterData({
      chainId: 8543,
      entryPointAddress: entryPoint06Address,
      callData,
      sender,
      nonce,
      initCode,
      maxFeePerGas,
      maxPriorityFeePerGas,
      callGasLimit,
      verificationGasLimit,
      preVerificationGas,
      context: paymasterContext,
    });

    return {
      paymaster: paymasterAndData.paymaster ?? '0x',
      paymasterAndData: paymasterAndData.paymasterAndData ?? '0x',
      paymasterVerificationGasLimit: paymasterAndData.paymasterVerificationGasLimit ?? 0n,
      paymasterPostOpGasLimit: paymasterAndData.paymasterPostOpGasLimit ?? 0n,
    };
  } catch (error) {
    console.error('Failed to get paymaster data:', error);
    throw error;
  }
}
