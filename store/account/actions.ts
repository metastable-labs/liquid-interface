import { PublicClient } from 'viem';
import useSystemFunctions from '@/hooks/useSystemFunctions';
import { publicClient } from '@/init/viem';
import { setLoading, setLpBalance, setPositions, setRefreshing, setTokenBalance, setTokens } from '.';
import { Position } from '@/hooks/types';
import { usePool } from '@/hooks/usePool';
import api from '@/init/api';
import { TokenResponse } from './types';

export function useAccountActions() {
  const { dispatch, accountState, smartAccountState } = useSystemFunctions();
  const { fetchPositions } = usePool(publicClient as PublicClient);

  const getTokens = async () => {
    try {
      dispatch(setLoading(true));

      const tokens = await api.getTokens('');

      const totalBalance = tokens.data.reduce((acc, token) => acc + parseFloat(token.balance) * parseFloat(token.usdPrice), 0);
      const sortedTokens = await _sortTokensByBalance(tokens.data);
      console.log(sortedTokens.find((token) => token.symbol === 'USDC'));
      tokens.data = [...sortedTokens];

      dispatch(setTokens(tokens));
      dispatch(setTokenBalance(totalBalance));
    } catch (error: any) {
      //
    } finally {
      dispatch(setLoading(false));
    }
  };

  const getUserTokens = async () => {
    try {
      if (!smartAccountState.address) return;

      dispatch(setLoading(true));

      const tokens = await api.getUserTokens(smartAccountState.address);

      const totalBalance = tokens.data.reduce((acc, token) => acc + parseFloat(token.balance) * parseFloat(token.usdPrice), 0);
      const sortedTokens = await _sortTokensByBalance(tokens.data);
      console.log(sortedTokens.find((token) => token.symbol === 'USDC'));
      tokens.data = [...sortedTokens];

      dispatch(setTokens(tokens));
      dispatch(setTokenBalance(totalBalance));
    } catch (error: any) {
      //
    } finally {
      dispatch(setLoading(false));
    }
  };

  const getPaginatedTokens = async (refresh?: boolean) => {
    try {
      if (refresh) {
        dispatch(setRefreshing(true));
        const tokens = await api.getTokens();

        return dispatch(setTokens(tokens));
      }

      const { tokens: currentTokens } = accountState;

      if (!currentTokens?.pagination?.hasMore) return;

      dispatch(setLoading(true));

      const nextPage = currentTokens?.pagination.page + 1;

      const query = `?page=${nextPage}`;

      const tokens = await api.getTokens(query);
      const sortedTokens = await _sortTokensByBalance(tokens.data);
      tokens.data = [...sortedTokens];

      const newData = { ...currentTokens.data, ...tokens.data };
      tokens.data = newData;

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

  const _sortTokensByBalance = async (tokens: TokenItem[]) => {
    const sortedTokens = tokens.sort((a, b) => {
      const balanceA = parseFloat(a.balance);
      const balanceB = parseFloat(b.balance);

      return balanceB - balanceA;
    });

    return sortedTokens;
  };

  return {
    getTokens,
    getPositions,
    getPaginatedTokens,
  };
}
