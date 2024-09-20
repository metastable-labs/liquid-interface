import useSystemFunctions from '@/hooks/useSystemFunctions';
import { CallbackProps } from '..';
import { setLoadingUser, setUser } from '.';

const useUserActions = () => {
  const { dispatch } = useSystemFunctions();

  const getUser = async (callback?: CallbackProps) => {
    try {
      dispatch(setLoadingUser(true));

      const mockUser: User = {
        id: '1',
        username: 'meister',
      };

      dispatch(setUser(mockUser));

      callback?.onSuccess?.(mockUser);
    } catch (error: any) {
      callback?.onError?.(error);
    } finally {
      dispatch(setLoadingUser(false));
    }
  };

  return {
    getUser,
  };
};

export default useUserActions;
