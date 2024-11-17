import { EntryPointABI, SmartWalletABI } from '@/constants/abis';
import { ACCOUNT_FACTORY_ADDRESS, ENTRYPOINT_V06_ADDRESS } from '@/constants/addresses';
import { Address, Chain, encodeAbiParameters, encodeFunctionData, Hex, keccak256, PublicClient, Transport } from 'viem';
import { entryPoint06Abi, entryPoint06Address, estimateUserOperationGas, PaymasterClient, UserOperation } from 'viem/account-abstraction';
import { estimateFeesPerGas, getCode, readContract } from 'viem/actions';
import { Call, PaymasterResult } from './types';
import { SmartAccountClient } from 'permissionless';
import { bundlerClient, publicClient } from '@/init/client';
import { smartWalletFactoryAbi } from '@/constants/abis/SmartWalletFactory';

export const PASSKEY_OWNER_DUMMY_SIGNATURE: Hex = '0x';

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
  console.log('Max fees:', {
    maxFeePerGas: maxFeesPerGas.maxFeePerGas.toString(),
    maxPriorityFeePerGas: maxFeesPerGas.maxPriorityFeePerGas.toString(),
  });
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
