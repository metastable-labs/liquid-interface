import { setAddress, setSmartAccount, setRegistrationOptions } from '@/store/smartAccount';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { createSmartAccount } from './createSmartAccount';
import { CreatePassKeyCredentialOptions } from '@/init/types';

export function useSmartAccountActions() {
  const dispatch = useAppDispatch();

  const smartAccountState = useAppSelector((state) => state.smartAccount);

  const setSmartAccountAction = async () => {
    if (!smartAccountState.registrationOptions) {
      throw new Error('Registration options are not available');
    }

    const { smartAccount, address } = await createSmartAccount(smartAccountState.registrationOptions);

    // TODO: fix serialization error of smartAccount into redux store, how are we going to save it?
    // dispatch(setSmartAccount(smartAccount));

    dispatch(setAddress(address));
  };

  const setRegistrationOptionsAction = (options: CreatePassKeyCredentialOptions) => {
    dispatch(setRegistrationOptions(options));
  };

  return {
    smartAccount: smartAccountState.smartAccount,
    address: smartAccountState.address,
    setSmartAccount: setSmartAccountAction,
    setRegistrationOptions: setRegistrationOptionsAction,
  };
}
