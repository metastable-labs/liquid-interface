import { PublicClient } from 'viem';
import useSystemFunctions from '@/hooks/useSystemFunctions';
import { useToken } from '@/hooks/useToken';
import { publicClient } from '@/init/viem';
import { setLoading, setLpBalance, setPositions, setRefreshing, setTokenBalance, setTokens } from '.';
import { Position, Token } from '@/hooks/types';
import { usePool } from '@/hooks/usePool';

export function useAccountActions() {
  const { dispatch } = useSystemFunctions();
  const { fetchTokens } = useToken(publicClient as PublicClient);
  const { fetchPositions } = usePool(publicClient as PublicClient);

  const getTokens = async (refresh?: boolean) => {
    try {
      if (refresh) {
        dispatch(setRefreshing(true));
        const tokens = await fetchTokens(15, 0);
        return _setValidTokens(tokens);
      }

      dispatch(setLoading(true));
      const tokens = await fetchTokens(15, 0);

      return _setValidTokens(tokens);
    } catch (error: any) {
      //
    } finally {
      dispatch(setLoading(false));
      dispatch(setRefreshing(false));
    }
  };

  const getPositions = async (refresh?: boolean) => {
    try {
      if (refresh) {
        dispatch(setRefreshing(true));
        const positions = await fetchPositions(15, 0);
        return _setValidPositions(positions || []);
      }

      dispatch(setLoading(true));
      const positions = await fetchPositions(15, 0);

      return _setValidPositions(positions || []);
    } catch (error: any) {
      //
    } finally {
      dispatch(setLoading(false));
      dispatch(setRefreshing(false));
    }
  };

  const _setValidTokens = async (tokens: Token[]) => {
    const validTokens = await tokens.filter((token) => token.isListed && token.balance !== '0');
    const totalBalance = validTokens.reduce((acc, token) => acc + parseFloat(token.balance) * parseFloat(token.usdPrice), 0);

    dispatch(setTokens(validTokens));
    dispatch(setTokenBalance(totalBalance));
  };

  const _setValidPositions = async (positions: Position[]) => {
    const validPositions = await positions.filter((po) => po.balance !== '0');
    const lpBalance = validPositions.reduce((acc, po) => acc + parseFloat(po.balance), 0);

    dispatch(setPositions(validPositions));
    dispatch(setLpBalance(lpBalance));
  };

  return {
    getTokens,
    getPositions,
  };
}
