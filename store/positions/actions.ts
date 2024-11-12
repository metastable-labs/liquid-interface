import useSystemFunctions from '@/hooks/useSystemFunctions';
import { setLoadingPositions, setPositions, setRefreshing, setSelectedPosition } from '.';
import { useLpSugarContract } from '@/hooks/useContract';

export function usePoolActions() {
  const { dispatch, positionsState } = useSystemFunctions();
  const lpSugar = useLpSugarContract();

  const getPositions = async () => {
    try {
      dispatch(setLoadingPositions(true));

      const positions = await lpSugar.getPositions('0xB553b8Ea24F9c305c37c09AF417302033dec7fDC');

      dispatch(setPositions(positions));
    } catch (error: any) {
      //
    } finally {
      dispatch(setLoadingPositions(false));
      dispatch(setRefreshing(false));
    }
  };

  return {
    getPositions,
  };
}
