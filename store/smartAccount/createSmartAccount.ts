import { Alert } from 'react-native';
import * as Passkeys from 'react-native-passkeys';
import { Address, hashMessage, hashTypedData, Hex, SignableMessage } from 'viem';
import { ToCoinbaseSmartAccountReturnType, WebAuthnAccount, toCoinbaseSmartAccount } from 'viem/account-abstraction';
import type { SignReturnType } from 'webauthn-p256';
import { utf8StringToBuffer, bufferToBase64URLString } from '@/utils/base64';
import { publicClient } from '@/init/viem';

export async function createSmartAccount(username: string): Promise<{
  smartAccount: ToCoinbaseSmartAccountReturnType;
  address: Address;
}> {
  try {
    const isPasskeyAvailable = Passkeys.isSupported();
    if (!isPasskeyAvailable) {
      throw new Error('Passkeys are not available on this device');
    }

    // const options = await this.api.getRegistrationOptions(username);

    // const registrationResponse = await this.passKeyImpl.createPassKeyCredential(options);

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

    if (!credential) {
      throw new Error('Failed to create passkey credential');
    }

    // Alert.alert('Created passkey successfully', JSON.stringify(credential));
    console.log('Created passkey successfully', JSON.stringify(credential));

    const credentialId = credential.id;
    const { attestationObject, clientDataJSON, publicKey } = credential.response;

    console.log('credentialId', credentialId);
    console.log('attestationObject', attestationObject);
    console.log('clientDataJSON', clientDataJSON);
    console.log('publicKey', publicKey);

    const registrationResponse = {
      credentialId,
      attestationObject,
      clientDataJSON,
    };

    // const verificationResponse = await this.api.verifyRegistration(username, registrationResponse);

    const publicKeyBuffer = utf8StringToBuffer(publicKey);
    const publicKeyHex = `0x${Array.from(new Uint8Array(publicKeyBuffer))
      .map((byte) => byte.toString(16).padStart(2, '0'))
      .join('')}` as Hex;

    console.log('publicKeyHex', publicKeyHex);

    const webAuthnAccount: WebAuthnAccount = {
      type: 'webAuthn',
      publicKey: publicKeyHex,
      sign: async ({ hash }: { hash: Hex }) => {
        try {
          const challenge = bufferToBase64URLString(utf8StringToBuffer(hash));

          const signResult = await Passkeys.get({
            challenge: hash,
            allowCredentials: [{ id: credentialId, type: 'public-key' }],
          });

          console.log('signResult', signResult);

          if (!signResult) {
            throw new Error('Failed to sign with passkey');
          }

          const signature = signResult.response.signature;
          const signatureHex = `0x${Buffer.from(signature, 'base64').toString('hex')}` as Hex;

          const authenticatorData = signResult.response.authenticatorData;
          const authenticatorDataHex = `0x${Buffer.from(authenticatorData, 'base64').toString('hex')}` as Hex;

          return {
            signature: signatureHex,
            webauthn: {
              authenticatorData: authenticatorDataHex,
              challengeIndex: clientDataJSON.indexOf(challenge.slice(2)),
              clientDataJSON,
              typeIndex: clientDataJSON.indexOf('"type":"webauthn.get"'),
              userVerificationRequired: false,
            },
          } as SignReturnType;
        } catch (error) {
          console.error(error);
          throw error;
        }
      },
      signMessage: async ({ message }: { message: SignableMessage }) => {
        const hash = hashMessage(message);
        return webAuthnAccount.sign({ hash });
      },
      signTypedData: async (typedData) => {
        const hash = hashTypedData(typedData);
        return webAuthnAccount.sign({ hash });
      },
    };

    const smartAccount = await toCoinbaseSmartAccount({
      client: publicClient,
      owners: [webAuthnAccount],
    });

    // console.log('smartAccount', JSON.stringify(smartAccount));

    const address = await smartAccount.getAddress();

    console.log('address', address);

    // Alert.alert('Smart account address', address);

    return { smartAccount, address };
  } catch (error: any) {
    // TODO: error handling
    // Alert.alert('Error creating smart wallet', error.message);
    console.error(error);
    throw error;
  }
}
