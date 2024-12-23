import { Address, Hex } from 'viem';

export type BuildUserOperationParams = {
  ownerIndex: bigint;
  authenticatorData: string;
  clientDataJSON: string;
  r: bigint;
  s: bigint;
};

export const SignatureWrapperStruct = {
  components: [
    {
      name: 'ownerIndex',
      type: 'uint8',
    },
    {
      name: 'signatureData',
      type: 'bytes',
    },
  ],
  name: 'SignatureWrapper',
  type: 'tuple',
};

export const WebAuthnAuthStruct = {
  components: [
    {
      name: 'authenticatorData',
      type: 'bytes',
    },
    { name: 'clientDataJSON', type: 'bytes' },
    { name: 'challengeIndex', type: 'uint256' },
    { name: 'typeIndex', type: 'uint256' },
    {
      name: 'r',
      type: 'uint256',
    },
    {
      name: 's',
      type: 'uint256',
    },
  ],
  name: 'WebAuthnAuth',
  type: 'tuple',
};

export type Call = {
  index: number;
  target: Address;
  value: bigint;
  data: Hex;
};

export interface PaymasterResult {
  paymaster: Address;
  paymasterAndData: Hex;
  paymasterVerificationGasLimit: bigint;
  paymasterPostOpGasLimit: bigint;
}

export interface UserOperationV6 {
  sender: Address;
  nonce: bigint;
  initCode: Hex;
  callData: Hex;
  callGasLimit: bigint;
  verificationGasLimit: bigint;
  preVerificationGas: bigint;
  maxFeePerGas: bigint;
  maxPriorityFeePerGas: bigint;
  paymasterAndData: Hex;
  signature: Hex;
}

export interface GasPrice {
  maxFeePerGas: string;
  maxPriorityFeePerGas: string;
}

export interface GasPriceResponse {
  slow: GasPrice;
  standard: GasPrice;
  fast: GasPrice;
}

export interface GasEstimateResponse {
  preVerificationGas: string;
  verificationGas: string;
  verificationGasLimit: string;
  callGasLimit: string;
}
