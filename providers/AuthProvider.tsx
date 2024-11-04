import { createContext, useContext, useState, PropsWithChildren } from 'react';
import * as Passkeys from 'react-native-passkeys';

import { useOnMount } from '@/hooks/useOnMount';
import { SmartAccount } from '@/init/types';
import { getPersistedSmartAccountInfo } from '@/store/smartAccount/persist';
import { SmartAccountInfoNotPersistedError } from '@/store/smartAccount/errors';
import { rpId } from '@/constants/env';
import { toCoinbaseSmartAccount, toWebAuthnAccount } from 'viem/account-abstraction';
import { publicClient } from '@/init/viem';
import { getPublicKeyHex } from '@/utils/base64';
import { getFn } from '@/store/smartAccount/getFn';
import useSystemFunctions from '@/hooks/useSystemFunctions';
import { setAddress } from '@/store/smartAccount';

type AuthContextType = {
  isLoading: boolean;
  session: SmartAccount | null;
  setSession: (smartAccount: SmartAccount) => void;
};

const AuthContext = createContext<AuthContextType>({
  isLoading: true,
  session: null,
  setSession: () => {},
});

export function AuthProvider({ children }: PropsWithChildren) {
  const { dispatch } = useSystemFunctions();
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState<AuthContextType['session']>(null);

  useOnMount(() => {
    loadSession();
  });

  async function loadSession() {
    try {
      const { publicKey, registrationResponse } = await getPersistedSmartAccountInfo();

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

      setSession(smartAccount);
      dispatch(setAddress(smartAccount.address));
    } catch (error) {
      // if (error instanceof SmartAccountInfoNotPersistedError) {
      //   //TODO: get challenge from backend
      //   const passkey = await Passkeys.get({ challenge: 'mock-challenge', rpId });

      //   if (!passkey) {
      //     throw new Error('No passkey found');
      //   }

      //   const webAuthnAccount = toWebAuthnAccount({
      //     credential: {
      //       id: passkey.id,
      //       // should be the publickey tied to the credential ID
      //       publicKey: getPublicKeyHex(passkey.response.signature),
      //     },
      //     getFn,
      //     rpId,
      //   });

      //   const smartAccount = await toCoinbaseSmartAccount({
      //     client: publicClient,
      //     owners: [webAuthnAccount],
      //   });

      //   setSession(smartAccount);
      //   dispatch(setAddress(smartAccount.address));

      //   return; // stop execution
      // }

      // catch all
      console.log('Failed to load session:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  return <AuthContext.Provider value={{ session, isLoading, setSession }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
