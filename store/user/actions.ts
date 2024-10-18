import useSystemFunctions from '@/hooks/useSystemFunctions';
import { CallbackProps } from '../index';
import { setLoadingUser, setUser } from './index';
import { User } from './types';

export function useUserActions() {
  const { dispatch, userState } = useSystemFunctions();

  const setUserAction = (user: User, callback?: CallbackProps) => {
    try {
      dispatch(setLoadingUser(true));

      dispatch(setUser(user));

      callback?.onSuccess?.(user);
    } catch (error: any) {
      callback?.onError?.(error);
    } finally {
      dispatch(setLoadingUser(false));
    }
  };

  const getUserAction = (callback?: CallbackProps) => {
    try {
      const user = userState.user;
      callback?.onSuccess?.(user);
      return user;
    } catch (error: any) {
      callback?.onError?.(error);
    }
  };

  return {
    setUser: setUserAction,
    getUser: getUserAction,
  };
}
