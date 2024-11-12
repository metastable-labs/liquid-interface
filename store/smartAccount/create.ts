import { Alert } from 'react-native';
import * as Passkeys from 'react-native-passkeys';
import { toCoinbaseSmartAccount, toWebAuthnAccount } from 'viem/account-abstraction';

import api from '@/init/api';
import { publicClient } from '@/init/viem';
import { isDev, rpId } from '@/constants/env';
import { SmartAccount, Address, SmartAccountPersistedInfo, VerifyRegistration } from '@/init/types';
import { getPublicKeyHex } from '@/utils/base64';

import { getFn } from './getFn';
import { FailedToCreatePasskeyCredentialError, FailedToUpdateUserAddressError, PasskeyNotSupportedError } from './errors';
import { PublicKeyCredentialCreationOptionsJSON } from 'react-native-passkeys/build/ReactNativePasskeys.types';

export async function createSmartAccount(registrationOptions: PublicKeyCredentialCreationOptionsJSON): Promise<{
  smartAccount: SmartAccount;
  address: Address;
  smartAccountInfo: SmartAccountPersistedInfo;
}> {
  try {
    const isPasskeyAvailable = Passkeys.isSupported();
    if (!isPasskeyAvailable) {
      throw new PasskeyNotSupportedError();
    }

    const credential = await Passkeys.create(registrationOptions);
    if (!credential) {
      throw new FailedToCreatePasskeyCredentialError();
    }
    console.log(credential, 'credential');

    const credentialId = credential.id;
    const { attestationObject, clientDataJSON, publicKey } = credential.response;

    const registrationResponse = {
      credentialId,
      attestationObject,
      clientDataJSON,
    };

    const smartAccountInfo: VerifyRegistration = {
      username: registrationOptions.user.name,
      id: registrationResponse.credentialId,
      rawId: registrationResponse.credentialId,
      response: {
        attestationObject: registrationResponse.attestationObject,
        clientDataJSON: registrationResponse.clientDataJSON,
      },
      type: 'public-key',
      authenticatorAttachment: 'platform',
    };

    const verificationResult = await api.verifyRegistration(smartAccountInfo);

    const webAuthnAccount = toWebAuthnAccount({
      credential: {
        id: registrationResponse.credentialId,
        publicKey: getPublicKeyHex(verificationResult.data.publicKey),
      },
      getFn,
      rpId,
    });

    const smartAccount = await toCoinbaseSmartAccount({
      client: publicClient,
      owners: [webAuthnAccount],
    });

    const address = await smartAccount.getAddress();
    const username = registrationOptions.user.name;

    const updateUserAddressResponse = await api.updateUserAddress(username, address);
    if (!updateUserAddressResponse.success) {
      throw new FailedToUpdateUserAddressError();
    }

    return {
      smartAccount,
      address,
      smartAccountInfo: {
        publicKey,
        credentialID: smartAccountInfo.id,
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
