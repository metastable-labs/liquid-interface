import { Alert } from 'react-native';
import * as Passkeys from 'react-native-passkeys';
import { utf8StringToBuffer, bufferToBase64URLString } from '@/utils/base64';

/**
 * Order of things
 *
 * 1. Get registration options via API GET call to /registration/options?user=username
 * 2. Use registration options to create passkey credential
 *
 * @param username
 */
export async function createSmartAccount(username: string) {
  try {
    const isPasskeyAvailable = Passkeys.isSupported();
    if (!isPasskeyAvailable) {
      throw new Error('Passkeys are not available on this device');
    }

    // const options = await this.api.getRegistrationOptions(username);
    const mockedOptions = {
      // rp: PublicKeyCredentialRpEntity;
      // user: PublicKeyCredentialUserEntityJSON;
      // challenge: Base64URLString;
      // pubKeyCredParams: PublicKeyCredentialParameters[];
      // timeout?: number;
      // excludeCredentials?: PublicKeyCredentialDescriptorJSON[];
      // authenticatorSelection?: AuthenticatorSelectionCriteria;
      // attestation?: AttestationConveyancePreference;
      // extensions?: AuthenticationExtensionsClientInputs;
    };

    // const registrationResponse = await this.passKeyImpl.createPassKeyCredential(options);
    const mockedRegistrationResponse = {
      // credentialId: string;
      // attestationObject: string;
      // clientDataJSON: string;
    };

    const credential = await Passkeys.create({
      challenge: bufferToBase64URLString(utf8StringToBuffer('mock-challenge')),
      rp: {
        name: 'Liquid Smart Account',
        id: 'api.useliquid.xyz',
      },
      user: {
        id: bufferToBase64URLString(utf8StringToBuffer(username)),
        name: username,
        displayName: username,
      },
      pubKeyCredParams: [{ type: 'public-key', alg: -7 }],
      authenticatorSelection: {
        authenticatorAttachment: 'platform',
        userVerification: 'required',
        residentKey: 'required',
        requireResidentKey: true,
      },
    });

    Alert.alert('Created passkey successfully', JSON.stringify(credential));
    console.log('Created passkey successfully', JSON.stringify(credential));
  } catch (error: any) {
    // TODO: error handling
    Alert.alert('Error creating smart wallet', error.message);
  }
}
