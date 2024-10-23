import { setAddress, setSmartAccount, setRegistrationOptions } from '@/store/smartAccount';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { createSmartAccount } from './createSmartAccount';
import { CreatePassKeyCredentialOptions } from '@/init/types';

export function useSmartAccountActions() {
  const dispatch = useAppDispatch();

  const userState = useAppSelector((state) => state.user);
  const smartAccountState = useAppSelector((state) => state.smartAccount);

  const setSmartAccountAction = async () => {
    if (!userState.user) {
      throw new Error('User is not available');
    }

    if (!smartAccountState.registrationOptions) {
      throw new Error('Registration options are not available');
    }

    const { smartAccount, address } = await createSmartAccount(userState.user.username, smartAccountState.registrationOptions);

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
