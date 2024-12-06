import useSystemFunctions from '@/hooks/useSystemFunctions';
import { setShowSearch, setSearchIsFocused } from '.';

const useAppActions = () => {
  const { dispatch } = useSystemFunctions();

  const showSearch = (hide: boolean) => {
    dispatch(setShowSearch(hide));
  };

  const searchIsFocused = (focused: boolean) => {
    dispatch(setSearchIsFocused(focused));
  };

  return {
    showSearch,
    searchIsFocused,
  };
};

export default useAppActions;
