import { EntryPointABI, SmartWalletABI } from '@/constants/abis';
import { ACCOUNT_FACTORY_ADDRESS, ENTRYPOINT_V06_ADDRESS } from '@/constants/addresses';
import { Address, Chain, encodeAbiParameters, encodeFunctionData, Hex, keccak256, PublicClient, Transport } from 'viem';
import {
  entryPoint06Abi,
  entryPoint06Address,
  estimateUserOperationGas,
  getUserOperationHash,
  PaymasterClient,
  UserOperation,
} from 'viem/account-abstraction';
import { estimateFeesPerGas, getCode, readContract } from 'viem/actions';
import { Call, GasEstimateResponse, GasPriceResponse, PaymasterResult, UserOperationV6 } from './types';
import { SmartAccountClient } from 'permissionless';
import { bundlerClient, publicClient } from '@/init/client';
import { smartWalletFactoryAbi } from '@/constants/abis/SmartWalletFactory';
import { pimilcoRPCURL } from '@/constants/env';
import { smartWalletABI } from '@/constants/abis/SmartWallet';

export const PASSKEY_OWNER_DUMMY_SIGNATURE: Hex =
  '0x0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000c0000000000000000000000000000000000000000000000000000000000000014000000000000000000000000000000000000000000000000000000000000000170000000000000000000000000000000000000000000000000000000000000001eef89a56cd6ebb7fa3650a467b2fb6609ff0741ee98c7db10e5199c5f32038ff56593ce0a1fd38f043ac2519b7e363720438b3c2433606098f36f5e99ef01c29000000000000000000000000000000000000000000000000000000000000004c30783937303165383131383932663033636137316438636464353239396432653538346534663734353462653439393537643463653363363630313263383264333731643030303030303030000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000767b2274797065223a22776562617574686e2e676574222c226368616c6c656e6765223a2257377a34326863705865626e326c656d4130375a4e723065706137627567466b534c74675f615a63743130222c226f726967696e223a2268747470733a2f2f6170692e7573656c69717569642e78797a227d00000000000000000000';

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
  // const maxFeePerGas = await estimateFeesPerGas(publicClient);
  const maxFeePerGas = (await getUserOperationGasPrice()).fast;

  // Increase gas limits for deployment
  const baseGasLimit = 1_000_000n;
  const deploymentBuffer = !code ? 3n : 2n; // Double gas limits for deployment

  // Put all the fields together in a user op
  const op = {
    sender: smartWalletAddress,
    nonce,
    initCode,
    callData,
    paymasterAndData,
    preVerificationGas: baseGasLimit,
    verificationGasLimit: baseGasLimit,
    callGasLimit: baseGasLimit,
    ...maxFeePerGas,
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
    maxFeePerGas: BigInt(op.maxFeePerGas),
    maxPriorityFeePerGas: BigInt(op.maxPriorityFeePerGas),
    signature: PASSKEY_OWNER_DUMMY_SIGNATURE,
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
      chainId: 8453,
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

export const getOwnerIndex = async (publicKey: string, smartwalletAddress: Hex): Promise<bigint> => {
  const ownerCount = await readContract(publicClient, {
    address: smartwalletAddress,
    abi: smartWalletABI,
    functionName: 'ownerCount',
    args: [],
  });

  for (let i = 0n; i < ownerCount; i++) {
    const ownerBytes = await readContract(publicClient, {
      address: smartwalletAddress,
      abi: smartWalletABI,
      functionName: 'ownerAtIndex',
      args: [i],
    });
    // For WebAuthn owners, check the public key matches
    if (ownerBytes.length === 64) {
      // Compare with your public key coordinates
      if (ownerBytes === publicKey) {
        return i;
      }
    }
  }

  throw new Error('Owner not found');
};

export const sendUserOperation = async (userOperation: UserOperationV6) => {
  const userOperationData = {
    sender: userOperation.sender,
    nonce: `0x${userOperation.nonce.toString(16)}`,
    initCode: userOperation.initCode,
    callData: userOperation.callData,
    callGasLimit: `0x${userOperation.callGasLimit.toString(16)}`,
    verificationGasLimit: `0x${userOperation.verificationGasLimit.toString(16)}`,
    preVerificationGas: `0x${userOperation.preVerificationGas.toString(16)}`,
    maxFeePerGas: `0x${userOperation.maxFeePerGas.toString(16)}`,
    maxPriorityFeePerGas: `0x${userOperation.maxPriorityFeePerGas.toString(16)}`,
    paymasterAndData: userOperation.paymasterAndData,
    signature: userOperation.signature,
  };

  const response = await fetch(pimilcoRPCURL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 1,
      method: 'eth_sendUserOperation',
      params: [userOperationData, entryPoint06Address],
    }),
  });

  const result = await response.json();
  if (result.error) {
    throw new Error(`Failed to send user operation: ${result.error.message}`);
  }

  return result.result as Hex;
};

export const getUserOperationGasPrice = async (): Promise<GasPriceResponse> => {
  const response = await fetch(pimilcoRPCURL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      jsonrpc: '2.0',
      method: 'pimlico_getUserOperationGasPrice',
      params: [],
      id: 1,
    }),
  });

  const result = await response.json();
  if (result.error) {
    throw new Error(`Failed to get gas price: ${result.error.message}`);
  }

  return result.result as GasPriceResponse;
};

export const estimateUserOperationGasInternal = async (userOperation: UserOperation): Promise<GasEstimateResponse> => {
  const formattedUserOp = {
    sender: userOperation.sender,
    nonce: `0x${userOperation.nonce.toString(16)}`,
    initCode: userOperation.initCode,
    callData: userOperation.callData,
    callGasLimit: '0x0',
    verificationGasLimit: '0x0',
    preVerificationGas: '0x0',
    maxFeePerGas: `0x${userOperation.maxFeePerGas.toString(16)}`,
    maxPriorityFeePerGas: `0x${userOperation.maxPriorityFeePerGas.toString(16)}`,
    paymasterAndData: userOperation.paymasterAndData,
    signature:
      '0x00000000fffffffffffffffffffffffffffffff0000000000000000000000000000000007aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1c',
  };

  const params = [formattedUserOp, entryPoint06Address];

  const response = await fetch(pimilcoRPCURL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      jsonrpc: '2.0',
      method: 'eth_estimateUserOperationGas',
      params,
      id: 1,
    }),
  });

  const result = await response.json();
  if (result.error) {
    throw new Error(`Failed to estimate gas: ${result.error.message}`);
  }

  return result.result;
};
