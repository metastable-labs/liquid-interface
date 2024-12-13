import useSystemFunctions from '@/hooks/useSystemFunctions';
import { setShowSearch, setSearchIsFocused, setStrategyActions } from '.';

const useAppActions = () => {
  const { dispatch } = useSystemFunctions();

  const showSearch = (hide: boolean) => {
    dispatch(setShowSearch(hide));
  };

  const searchIsFocused = (focused: boolean) => {
    dispatch(setSearchIsFocused(focused));
  };

  const handleStrategyActions = (actions: StrategyAction[]) => {
    dispatch(setStrategyActions(actions));
  };

  return {
    showSearch,
    searchIsFocused,
    handleStrategyActions,
  };
};

export default useAppActions;
