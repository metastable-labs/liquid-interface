import { Alert } from 'react-native';
import * as Passkeys from 'react-native-passkeys';
import { toCoinbaseSmartAccount, toWebAuthnAccount } from 'viem/account-abstraction';

import api from '@/init/api';
import { publicClient } from '@/init/viem';
import { isDev, rpId } from '@/constants/env';
import { CreatePassKeyCredentialOptions, SmartAccount, Address, SmartAccountPersistedInfo } from '@/init/types';
import { getPublicKeyHex } from '@/utils/base64';

import { getFn } from './getFn';

export async function createSmartAccount(registrationOptions: CreatePassKeyCredentialOptions): Promise<{
  smartAccount: SmartAccount;
  address: Address;
  smartAccountInfo: SmartAccountPersistedInfo;
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

    const webAuthnAccount = toWebAuthnAccount({
      credential: {
        id: registrationResponse.credentialId,
        publicKey: getPublicKeyHex(publicKey),
      },
      getFn,
      rpId,
    });

    const smartAccount = await toCoinbaseSmartAccount({
      client: publicClient,
      owners: [webAuthnAccount],
    });

    const address = await smartAccount.getAddress();
    console.log('address', address);

    const updateUserAddressResponse = await api.updateUserAddress(registrationOptions.user.name, address);
    console.log('updateUserAddressResponse', updateUserAddressResponse);

    if (!updateUserAddressResponse.success) {
      throw new Error('Failed to update user address');
    }

    return {
      smartAccount,
      address,
      smartAccountInfo: {
        publicKey,
        registrationResponse,
      },
    };
  } catch (error: any) {
    if (error.message && error.message.includes('Biometrics must be enabled')) {
      const alertTitle = 'Device not enrolled to FaceID';
      const alertMessage = isDev
        ? 'On the top menu bar, click on \nFeatures > Face ID > Enrolled'
        : 'Please enroll your device to FaceID on settings';

      return new Promise((resolve) => {
        Alert.alert(alertTitle, alertMessage, [
          {
            text: 'Try again',
            onPress: async () => {
              const result = await createSmartAccount(registrationOptions);
              resolve(result);
            },
          },
        ]);
      });
    }

    console.error(error);
    throw error;
  }
}
