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
