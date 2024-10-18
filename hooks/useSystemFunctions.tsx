/**
 *
 * @description - Groups commonly used system functions and data in a central location for
 *                easy access and update. Commonly used funtions should be included here
 *                so we don't have to import and create same funtions everywhere.
 */

import { useAppDispatch, useAppSelector } from './useRedux';
import { router, usePathname, useLocalSearchParams } from 'expo-router';

const useSystemFunctions = () => {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const params = useLocalSearchParams();

  // states
  const userState = useAppSelector((state) => state.user);
  const appState = useAppSelector((state) => state.app);

  return {
    dispatch,
    router,
    pathname,
    params,

    // states
    userState,
    appState,
  };
};

export default useSystemFunctions;
