import { toCoinbaseSmartAccount, toWebAuthnAccount } from 'viem/account-abstraction';

import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { setAddress, setRegistrationOptions } from '@/store/smartAccount';
import { CreatePassKeyCredentialOptions } from '@/init/types';
import { publicClient } from '@/init/viem';
import { rpId } from '@/constants/env';
import { getPublicKeyHex } from '@/utils/base64';

import { createSmartAccount } from './create';
import { getPersistedSmartAccountInfo, persistSmartAccountInfo } from './persist';
import { getFn } from './getFn';
import { RegistrationOptionsNotAvailableError } from './errors';

export function useSmartAccountActions() {
  const dispatch = useAppDispatch();

  const smartAccountState = useAppSelector((state) => state.smartAccount);

  const setRegistrationOptionsAction = (options: CreatePassKeyCredentialOptions) => {
    dispatch(setRegistrationOptions(options));
  };

  const setSmartAccountAction = async () => {
    if (!smartAccountState.registrationOptions) {
      throw new RegistrationOptionsNotAvailableError();
    }

    const { address, smartAccountInfo, smartAccount } = await createSmartAccount(smartAccountState.registrationOptions);

    await persistSmartAccountInfo(smartAccountInfo);

    dispatch(setAddress(address));

    return smartAccount;
  };

  const getSmartAccountAction = async () => {
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

  return {
    address: smartAccountState.address,
    setRegistrationOptions: setRegistrationOptionsAction,
    setSmartAccount: setSmartAccountAction,
    getSmartAccount: getSmartAccountAction,
  };
}
