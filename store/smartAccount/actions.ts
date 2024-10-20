import { setAddress, setSmartAccount } from '@/store/smartAccount';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { createSmartAccount } from './createSmartAccount';

export function useSmartAccountActions() {
  const dispatch = useAppDispatch();
  const smartAccountState = useAppSelector((state) => state.smartAccount);

  const create = async (username: string) => {
    const { smartAccount, address } = await createSmartAccount(username);
    // TODO: fix serialization error
    // dispatch(setSmartAccount(smartAccount));
    dispatch(setAddress(address));
  };

  return {
    smartAccount: smartAccountState.smartAccount,
    address: smartAccountState.address,
    create,
  };
}
