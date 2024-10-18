import useSystemFunctions from '@/hooks/useSystemFunctions';
import { CallbackProps } from '..';
import { setHideSearch, setSearchIsFocused } from '.';

const useAppActions = () => {
  const { dispatch } = useSystemFunctions();

  const hideSearch = (hide: boolean) => {
    dispatch(setHideSearch(hide));
  };

  const searchIsFocused = (focused: boolean) => {
    dispatch(setSearchIsFocused(focused));
  };

  return {
    hideSearch,
    searchIsFocused,
  };
};

export default useAppActions;
