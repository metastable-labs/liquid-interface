import { toCoinbaseSmartAccount, toWebAuthnAccount } from 'viem/account-abstraction';

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

export function useSmartAccountActions() {
  const { dispatch, router, smartAccountState } = useSystemFunctions();

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
    const { publicKey, registrationResponse } = await getPersistedSmartAccountInfo();

    const webAuthnAccount = toWebAuthnAccount({
      credential: {
        id: registrationResponse.credentialId,
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
  };
}
