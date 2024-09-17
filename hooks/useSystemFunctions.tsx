/**
 *
 * @description - Groups commonly used system functions and data in a central location for
 *                easy access and update. Commonly used funtions should be included here
 *                so we don't have to import and create same funtions everywhere.
 */

import { useAppDispatch, useAppSelector } from "./useRedux";
import { router } from "expo-router";

const useSystemFunctions = () => {
  const dispatch = useAppDispatch();

  // states
  const userState = useAppSelector((state) => state.user);

  return {
    dispatch,
    router,

    // states
    userState,
  };
};

export default useSystemFunctions;
