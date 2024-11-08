import { toCoinbaseSmartAccount, toWebAuthnAccount } from 'viem/account-abstraction';
import * as Passkeys from 'react-native-passkeys';

import { setAddress, setRegistrationOptions } from '@/store/smartAccount';
import { CreatePassKeyCredentialOptions } from '@/init/types';
import { publicClient } from '@/init/viem';
import { rpId } from '@/constants/env';
import { getPublicKeyHex } from '@/utils/base64';
import useSystemFunctions from '@/hooks/useSystemFunctions';

import { createSmartAccount } from './create';
import { clearPersistedSmartAccountInfo, getPersistedSmartAccountInfo, persistSmartAccountInfo } from './persist';
import { getFn } from './getFn';
import { RegistrationOptionsNotAvailableError } from './errors';
import { setLpBalance, setPositions, setTokenBalance, setTokens } from '../account';
import api from '@/init/api';
import { useAuth } from '@/providers';

export function useSmartAccountActions() {
  const { dispatch, router, smartAccountState } = useSystemFunctions();
  const { setSession } = useAuth();

  const updateRegistrationOptions = (options: CreatePassKeyCredentialOptions) => {
    dispatch(setRegistrationOptions(options.data));
  };

  const setSmartAccount = async () => {
    if (!smartAccountState.registrationOptions) {
      throw new RegistrationOptionsNotAvailableError();
    }

    const { address, smartAccountInfo, smartAccount } = await createSmartAccount(smartAccountState.registrationOptions);

    await persistSmartAccountInfo(smartAccountInfo);

    dispatch(setAddress(address));

    return smartAccount;
  };

  const getSmartAccount = async () => {
    const { publicKey, credentialID } = await getPersistedSmartAccountInfo();

    const webAuthnAccount = toWebAuthnAccount({
      credential: {
        id: credentialID,
        publicKey: getPublicKeyHex(publicKey),
      },
      getFn,
      rpId,
    });

    const smartAccount = toCoinbaseSmartAccount({
      client: publicClient,
      owners: [webAuthnAccount],
    });

    return smartAccount;
  };

  const login = async (userName: string) => {
    try {
      const authOptions = await api.getAuthenticationOptions(userName);

      const passkey = await Passkeys.get({ challenge: authOptions.data.challenge, rpId: authOptions.data.rpId });
      if (!passkey) {
        throw new Error('No passkey found');
      }
      const webAuthnAccount = toWebAuthnAccount({
        credential: {
          id: passkey.id,
          // should be the publickey tied to the credential ID
          publicKey: getPublicKeyHex(passkey.response.signature),
        },
        getFn,
        rpId,
      });
      const smartAccount = await toCoinbaseSmartAccount({
        client: publicClient,
        owners: [webAuthnAccount],
      });
      const smartAccountInfo = {
        publicKey: getPublicKeyHex(passkey.response.signature),
        credentialID: passkey.id,
      };

      await persistSmartAccountInfo(smartAccountInfo);

      setSession(smartAccount);
      dispatch(setAddress(smartAccount.address));
      return router.replace('/(tabs)/home');
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      dispatch(setAddress(null));
      dispatch(setTokens([]));
      dispatch(setTokenBalance(0));
      dispatch(setPositions([]));
      dispatch(setLpBalance(0));
      await clearPersistedSmartAccountInfo();

      return router.replace('/(onboarding)/step1');
    } catch (error) {
      console.log(error);
    }
  };

  return {
    updateRegistrationOptions,
    setSmartAccount,
    getSmartAccount,
    logout,
    login,
  };
}
