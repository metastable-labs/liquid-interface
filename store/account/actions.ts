import { PublicClient } from 'viem';
import useSystemFunctions from '@/hooks/useSystemFunctions';
import { useToken } from '@/hooks/useToken';
import { publicClient } from '@/init/viem';
import { setLoading, setLpBalance, setPositions, setRefreshing, setTokenBalance, setTokens } from '.';
import { Position, Token } from '@/hooks/types';
import { usePool } from '@/hooks/usePool';
import api from '@/init/api';
import { TokenItem, TokenResponse } from './types';

export function useAccountActions() {
  const { dispatch, accountState } = useSystemFunctions();
  const { fetchTokens } = useToken(publicClient as PublicClient);
  const { fetchPositions } = usePool(publicClient as PublicClient);

  const getTokens = async (refresh?: boolean) => {
    try {
      if (refresh) {
        dispatch(setRefreshing(true));
        const tokens = await api.getTokens();

        return dispatch(setTokens(tokens));
      }

      const { tokens: currentTokens } = accountState;

      dispatch(setLoading(true));

      let tokens: TokenResponse;

      if (currentTokens === undefined || currentTokens.pagination.page === 0) {
        tokens = await api.getTokens('');
      } else {
        if (!currentTokens.pagination.hasMore) return;

        const nextPage = currentTokens?.pagination.page + 1;

        const query = `?page=${nextPage}`;

        tokens = await api.getTokens(query);

        const newData = { ...currentTokens.data, ...tokens.data };
        tokens.data = newData;
      }

      const totalBalance = tokens.data.reduce((acc, token) => acc + parseFloat(token.balance) * parseFloat(token.usdPrice), 0);

      dispatch(setTokens(tokens));
      dispatch(setTokenBalance(totalBalance));
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
