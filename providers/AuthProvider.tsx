import { createContext, useContext, useState, PropsWithChildren } from 'react';
import * as Passkeys from 'react-native-passkeys';

import { useOnMount } from '@/hooks/useOnMount';
import { SmartAccount } from '@/init/types';
import { getPersistedSmartAccountInfo, SmartAccountInfoNotFoundError } from '@/store/smartAccount/persistSmartAccount';
import { rpId } from '@/constants/env';
import { toCoinbaseSmartAccount, toWebAuthnAccount } from 'viem/account-abstraction';
import { publicClient } from '@/init/viem';
import { getPublicKeyHex } from '@/utils/base64';
import { getFn } from '@/store/smartAccount/getFn';

type AuthContextType = {
  session: SmartAccount | null;
  setSession: (smartAccount: SmartAccount) => void;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  session: null,
  setSession: () => {},
  isLoading: true,
});

export function AuthProvider({ children }: PropsWithChildren) {
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState<AuthContextType['session']>(null);

  useOnMount(() => {
    loadSession();
  });

  async function loadSession() {
    try {
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

        console.log('webAuthnAccount', webAuthnAccount);

        const smartAccount = await toCoinbaseSmartAccount({
          client: publicClient,
          owners: [webAuthnAccount],
        });

        console.log('smartAccount', Object.keys(smartAccount));

        setSession(smartAccount);
      } catch (error) {
        if (error instanceof SmartAccountInfoNotFoundError) {
          //TODO: get challenge from backend
          const passkey = await Passkeys.get({ challenge: 'mock-challenge', rpId });

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

          console.log('webAuthnAccount', webAuthnAccount);

          const smartAccount = await toCoinbaseSmartAccount({
            client: publicClient,
            owners: [webAuthnAccount],
          });

          console.log('smartAccount', Object.keys(smartAccount));

          setSession(smartAccount);

          return; // stop execution
        }

        // catch all
        throw error;
      }
    } catch (error) {
      console.log('Failed to load session:', error);
    } finally {
      setIsLoading(false);
    }
  }

  return <AuthContext.Provider value={{ session, isLoading, setSession }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
