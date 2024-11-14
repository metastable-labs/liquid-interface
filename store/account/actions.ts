import { PublicClient } from 'viem';
import useSystemFunctions from '@/hooks/useSystemFunctions';
import { publicClient } from '@/init/viem';
import { setLoading, setLpBalance, setPositions, setRefreshing, setTokenBalance, setTokens } from '.';
import { Position } from '@/hooks/types';
import api from '@/init/api';
import { TokenItem } from './types';

export function useAccountActions() {
  const { dispatch, accountState, smartAccountState } = useSystemFunctions();

  const getTokens = async () => {
    try {
      dispatch(setLoading(true));

      const query = smartAccountState.address ? `?address=${smartAccountState.address}` : '';
      const tokens = await api.getTokens(query);

      const totalBalance = tokens.data.reduce((acc, token) => acc + parseFloat(token.usdBalance || '0'), 0);
      const sortedTokens = await _sortTokensByBalance(tokens.data);

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

        const query = smartAccountState.address ? `?address=${smartAccountState.address}` : '';
        const tokens = await api.getTokens(query);

        return dispatch(setTokens(tokens));
      }

      const { tokens: currentTokens } = accountState;

      if (!currentTokens?.pagination?.hasMore) return;

      dispatch(setLoading(true));

      const nextPage = currentTokens?.pagination.page + 1;

      const addressQuery = smartAccountState.address ? `address=${smartAccountState.address}` : '';
      const query = `?page=${nextPage}&address=${addressQuery}`;

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

  // const getPositions = async (refresh?: boolean) => {
  //   try {
  //     if (refresh) {
  //       dispatch(setRefreshing(true));
  //       console.log('got here');
  //       const returnedPosition = await lpSugar.getPositions(TEST_USER);

  //       console.log(returnedPosition, 'returned position');
  //       return _setValidPositions(positions || []);
  //     }

  //     dispatch(setLoading(true));
  //     const returnedPosition = await lpSugar.getPositions(TEST_USER);

  //     return _setValidPositions(positions || []);
  //   } catch (error: any) {
  //     //
  //   } finally {
  //     dispatch(setLoading(false));
  //     dispatch(setRefreshing(false));
  //   }
  // };

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
    //getPositions,
    getPaginatedTokens,
  };
}
