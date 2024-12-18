import { toCoinbaseSmartAccount, toWebAuthnAccount } from 'viem/account-abstraction';
import * as Passkeys from 'react-native-passkeys';

import { setAddress, setRegistrationOptions } from '@/store/smartAccount';
import { CreatePassKeyCredentialOptions, VerifyAuthResponse } from '@/init/types';
import { publicClient } from '@/init/client';
import { rpId } from '@/constants/env';
import useSystemFunctions from '@/hooks/useSystemFunctions';

import { createSmartAccount } from './create';
import { clearPersistedSmartAccountInfo, getPersistedSmartAccountInfo, persistSmartAccountInfo } from './persist';
import { getFn } from './getFn';
import { RegistrationOptionsNotAvailableError } from './errors';
import { setLpBalance, setPositions, setTokenBalance, setTokens } from '../account';
import api from '@/init/api';
import { useAuth } from '@/providers';
import { Hex } from 'viem';
import { AuthenticationResponseJSON } from 'react-native-passkeys/build/ReactNativePasskeys.types';
import { base64URLStringToHex } from '@/utils/base64';

export function useSmartAccountActions() {
  const { dispatch, router, smartAccountState } = useSystemFunctions();
  const { setSession, session } = useAuth();

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
        publicKey,
      },
      getFn,
      rpId,
    });

    const smartAccount = toCoinbaseSmartAccount({
      client: publicClient,
      owners: [webAuthnAccount],
    });

    return { webAuthnAccount, smartAccount };
  };

  const login = async (userName: string) => {
    try {
      const authOptions = await api.getAuthenticationOptions(userName);

      const passkeyResult = await Passkeys.get({ challenge: authOptions.data.challenge, rpId: authOptions.data.rpId });
      if (!passkeyResult) {
        throw new Error('No passkey found');
      }

      const authenticationResponse: VerifyAuthResponse = {
        id: passkeyResult.id,
        rawId: passkeyResult.rawId,
        response: {
          authenticatorData: passkeyResult.response.authenticatorData,
          clientDataJSON: passkeyResult.response.clientDataJSON,
          signature: passkeyResult.response.signature,
          userHandle: passkeyResult.response.userHandle!,
        },
        type: 'public-key',
        authenticatorAttachment: 'platform',
      };

      const verification = await api.verifyAuthentication(userName, authenticationResponse);

      console.log(verification.data.publicKey, 'update');

      const webAuthnAccount = toWebAuthnAccount({
        credential: {
          id: passkeyResult.id,
          publicKey: verification.data.publicKey as `0x${string}`,
        },
        getFn,
        rpId,
      });
      const smartAccount = await toCoinbaseSmartAccount({
        client: publicClient,
        owners: [webAuthnAccount],
      });

      await persistSmartAccountInfo({
        publicKey: verification.data.publicKey as `0x${string}`,
        credentialID: passkeyResult.id,
      });

      setSession(smartAccount);
      dispatch(setAddress(smartAccount.address));
      return router.replace('/(tabs)/home');
    } catch (error) {
      console.log(error);
    }
  };

  const signTransaction = async (hash: Hex) => {
    const { webAuthnAccount } = await getSmartAccount();
    const signatureData = await webAuthnAccount.sign({ hash });

    return signatureData;
  };
  const logout = async () => {
    try {
      dispatch(setAddress(null));
      dispatch(setTokens(undefined));
      dispatch(setTokenBalance(0));
      dispatch(setPositions(undefined));
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
    signTransaction,
  };
}
