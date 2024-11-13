import { PublicClient } from 'viem';
import useSystemFunctions from '@/hooks/useSystemFunctions';
import { publicClient } from '@/init/viem';
import { setLoading, setLpBalance, setPositions, setRefreshing, setTokenBalance, setTokens } from '.';
import { Position } from '@/hooks/types';
import api from '@/init/api';
import { TokenResponse } from './types';
import { LP_SUGAR_ADDRESS, TEST_USER } from '@/constants/addresses';
import { useLpSugarContract } from '@/hooks/useContract';

export function useAccountActions() {
  const { dispatch, accountState } = useSystemFunctions();
  const lpSugar = useLpSugarContract(LP_SUGAR_ADDRESS);

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

  return {
    getTokens,
    // getPositions,
  };
}
