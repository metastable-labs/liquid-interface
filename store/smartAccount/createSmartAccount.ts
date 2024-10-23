import { Alert } from 'react-native';
import * as Passkeys from 'react-native-passkeys';
import { Address, hashMessage, hashTypedData, Hex, SignableMessage } from 'viem';
import { ToCoinbaseSmartAccountReturnType, WebAuthnAccount, toCoinbaseSmartAccount } from 'viem/account-abstraction';
import type { SignReturnType } from 'webauthn-p256';
import { utf8StringToBuffer, bufferToBase64URLString } from '@/utils/base64';
import { publicClient } from '@/init/viem';
import { CreatePassKeyCredentialOptions } from '@/init/types';

export async function createSmartAccount(
  username: string,
  registrationOptions: CreatePassKeyCredentialOptions
): Promise<{
  smartAccount: ToCoinbaseSmartAccountReturnType;
  address: Address;
}> {
  try {
    const isPasskeyAvailable = Passkeys.isSupported();
    if (!isPasskeyAvailable) {
      throw new Error('Passkeys are not available on this device');
    }

    const credential = await Passkeys.create(registrationOptions);

    if (!credential) {
      throw new Error('Failed to create passkey credential');
    }

    const credentialId = credential.id;
    const { attestationObject, clientDataJSON, publicKey } = credential.response;

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

    const address = await smartAccount.getAddress();

    console.log('address', address);

    return { smartAccount, address };
  } catch (error: any) {
    if (error.message && error.message.includes('Biometrics must be enabled')) {
      Alert.alert(
        'Your device is not enrolled to FaceID',
        'If you are using a simulator, on the top menu bar, click on Features > Face ID > Enrolled',
        [
          {
            text: 'Try again',
            onPress: () => {
              createSmartAccount(username, registrationOptions);
            },
          },
        ]
      );
    }
    console.error(error);
    throw error;
  }
}
