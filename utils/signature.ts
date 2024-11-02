import {
  decodeAbiParameters,
  encodeAbiParameters,
  encodePacked,
  type Hex,
  hexToBigInt,
  hexToBytes,
  sha256,
  stringToBytes,
  stringToHex,
} from 'viem';
import { BuildUserOperationParams, SignatureWrapperStruct, WebAuthnAuthStruct } from './types';

export function buildWebAuthnSignature({ ownerIndex, authenticatorData, clientDataJSON, r, s }: BuildUserOperationParams): Hex {
  const challengeIndex = clientDataJSON.indexOf('"challenge":');
  const typeIndex = clientDataJSON.indexOf('"type":');

  const webAuthnAuthBytes = encodeAbiParameters(
    [WebAuthnAuthStruct],
    [
      {
        authenticatorData,
        clientDataJSON: stringToHex(clientDataJSON),
        challengeIndex,
        typeIndex,
        r,
        s,
      },
    ]
  );

  return encodeAbiParameters(
    [SignatureWrapperStruct],
    [
      {
        ownerIndex,
        signatureData: webAuthnAuthBytes,
      },
    ]
  );
}
