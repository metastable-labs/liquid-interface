import * as Passkeys from 'react-native-passkeys';
import type { SignParameters } from 'webauthn-p256';

import { base64URLStringToBuffer, bufferToBase64URLString } from '@/utils/base64';

import { CredentialRequestOptionsNotAvailableError, FailedToGetPasskeyCredentialError } from './errors';

type GetFnType = Required<SignParameters>['getFn'];

export const getFn: GetFnType = async (options) => {
  try {
    if (!options) throw new CredentialRequestOptionsNotAvailableError('options');
    if (!options.publicKey) throw new CredentialRequestOptionsNotAvailableError('options.publicKey');
    if (!options.publicKey.rpId) throw new CredentialRequestOptionsNotAvailableError('options.publicKey.rpId');

    const { rpId, challenge, allowCredentials } = options.publicKey;

    // Convert challenge and allowCredentials.id from Buffer object to Base64URL string
    const convertToBase64URL = (obj: BufferSource) => bufferToBase64URLString(obj as ArrayBuffer);
    const requestOptions = {
      rpId,
      challenge: convertToBase64URL(challenge),
      allowCredentials: allowCredentials?.map((cred) => ({
        ...cred,
        id: convertToBase64URL(cred.id),
      })),
    };

    const result = await Passkeys.get(requestOptions);
    if (!result) {
      throw new FailedToGetPasskeyCredentialError();
    }

    const credential = {
      id: result.id,
      type: 'public-key',
      response: {
        authenticatorData: base64URLStringToBuffer(result.response.authenticatorData),
        clientDataJSON: base64URLStringToBuffer(result.response.clientDataJSON),
        signature: base64URLStringToBuffer(result.response.signature),
      },
    };

    return credential as Credential;
  } catch (error) {
    console.error('getFn error:', error);
    throw error;
  }
};
