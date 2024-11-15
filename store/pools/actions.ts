import useSystemFunctions from '@/hooks/useSystemFunctions';
import { setHotPools, setLoadingPools, setRefreshing, setSearchedPools, setSearchingPools, setTopGainers, setTrendingPools } from '.';
import api from '@/init/api';
import { PoolType } from '@/init/types';

export function usePoolActions() {
  const { dispatch, poolsState } = useSystemFunctions();

  const { hotPools, topGainers, trendingPools, searchedPools } = poolsState;

  const getPools = async () => {
    try {
      dispatch(setLoadingPools(true));

      const hotPools = await api.getPools(PoolType.hot);

      dispatch(setHotPools(hotPools));

      const trendingPools = await api.getPools(PoolType.trending);
      dispatch(setTrendingPools(trendingPools));

      const topGainers = await api.getPools(PoolType.gainers);

      dispatch(setTopGainers(topGainers));
    } catch (error: any) {
      //
    } finally {
      dispatch(setLoadingPools(false));
    }
  };

  const getPaginatedHotPools = async (refresh?: boolean) => {
    try {
      if (refresh) {
        dispatch(setRefreshing(true));
        const pools = await api.getPools(PoolType.hot);

        return dispatch(setHotPools(pools));
      }

      if (!hotPools.pagination.hasMore) return;

      dispatch(setLoadingPools(true));

      const nextPage = hotPools.pagination.page + 1;

      const query = `?page=${nextPage}`;
      const pools = await api.getPools(PoolType.hot, query);

      const newData = { ...hotPools.data, ...pools.data };
      pools.data = newData;

      dispatch(setHotPools(pools));
    } catch (error: any) {
      //
    } finally {
      dispatch(setLoadingPools(false));
      dispatch(setRefreshing(false));
    }
  };

  const getPaginatedTrendingPools = async (refresh?: boolean) => {
    try {
      if (refresh) {
        dispatch(setRefreshing(true));
        const pools = await api.getPools(PoolType.trending);

        console.log(pools, 'pools trending');

        return dispatch(setTrendingPools(pools));
      }

      if (!trendingPools.pagination.hasMore) return;

      dispatch(setLoadingPools(true));

      const nextPage = trendingPools.pagination.page + 1;

      const query = `?page=${nextPage}`;

      const pools = await api.getPools(PoolType.trending, query);
      const newData = [...trendingPools.data, ...pools.data];
      pools.data = newData;

      dispatch(setTrendingPools(pools));
    } catch (error: any) {
      //
    } finally {
      dispatch(setLoadingPools(false));
      dispatch(setRefreshing(false));
    }
  };

  const getPaginatedTopGainers = async (refresh?: boolean) => {
    try {
      if (refresh) {
        dispatch(setRefreshing(true));
        const pools = await api.getPools(PoolType.gainers);

        return dispatch(setTopGainers(pools));
      }

      if (!topGainers.pagination.hasMore) return;

      dispatch(setLoadingPools(true));

      const nextPage = topGainers.pagination.page + 1;

      const query = `?page=${nextPage}`;

      const pools = await api.getPools(PoolType.gainers, query);

      const newData = { ...topGainers.data, ...pools.data };
      pools.data = newData;

      dispatch(setTopGainers(pools));
    } catch (error: any) {
      //
    } finally {
      dispatch(setLoadingPools(false));
      dispatch(setRefreshing(false));
    }
  };

  const searchPools = async (searchQuery: string) => {
    try {
      if (!searchQuery) return dispatch(setSearchedPools(undefined));

      dispatch(setSearchingPools(true));

      const pools = await api.searchPools(encodeURIComponent(searchQuery));

      dispatch(setSearchedPools(pools));
    } catch (error: any) {
      //
    } finally {
      dispatch(setSearchingPools(false));
      dispatch(setRefreshing(false));
    }
  };

  const getPaginatedSearchPools = async (searchQuery: string) => {
    try {
      if (!searchedPools.pagination.hasMore || !searchQuery) return;

      dispatch(setSearchingPools(true));

      const nextPage = searchedPools.pagination.page + 1;

      const query = `&page=${nextPage}`;

      const pools = await api.searchPools(encodeURIComponent(searchQuery), query);

      const newData = { ...topGainers.data, ...pools.data };
      pools.data = newData;

      dispatch(setSearchedPools(pools));
    } catch (error: any) {
      //
    } finally {
      dispatch(setSearchingPools(false));
    }
  };

  return {
    getPools,
    getPaginatedHotPools,
    getPaginatedTrendingPools,
    getPaginatedTopGainers,
    searchPools,
    getPaginatedSearchPools,
  };
}
