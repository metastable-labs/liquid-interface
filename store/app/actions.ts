import useSystemFunctions from '@/hooks/useSystemFunctions';
import { CallbackProps } from '..';
import { setCoinbaseIsActive, setHideSearch, setSearchIsFocused } from '.';

const useAppActions = () => {
  const { dispatch } = useSystemFunctions();

  const hideSearch = (hide: boolean) => {
    dispatch(setHideSearch(hide));
  };

  const searchIsFocused = (focused: boolean) => {
    dispatch(setSearchIsFocused(focused));
  };

  const coinbaseIsActive = (active: boolean) => {
    dispatch(setCoinbaseIsActive(active));
  };

  return {
    hideSearch,
    searchIsFocused,
    coinbaseIsActive,
  };
};

export default useAppActions;
