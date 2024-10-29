import useSystemFunctions from '@/hooks/useSystemFunctions';
import { usePool } from '@/hooks/usePool';
import { publicClient } from '@/init/viem';
import { PublicClient } from 'viem';
import { setHotPools, setLoadingPools, setTopGainers, setTrendingPools, setpools } from '.';
import { BasePool } from '@/hooks/types';

export function usePoolActions() {
  const { dispatch, userState, poolsState } = useSystemFunctions();
  const { pools, positions, fetchPools, fetchPositions, getPoolByAddress } = usePool(publicClient as PublicClient);

  const totalPools = 1800;

  const getPools = async () => {
    try {
      dispatch(setLoadingPools(true));
      _setPools([]);

      let allPools: BasePool[] = [];

      for (let i = 0; i < totalPools; i += 300) {
        const pools = await fetchPools(300, i);
        if (!pools) return;

        console.log('fetched pools', pools.length);
        allPools.push(...pools);
      }

      console.log('all pools is ', allPools.length);
      _setPools(allPools);
    } catch (error: any) {
      //
    } finally {
      dispatch(setLoadingPools(false));
    }
  };

  const _setPools = (pools: BasePool[]) => {
    dispatch(setpools(pools));

    const trendingPools = pools.sort((a, b) => {
      return Number(b.volume.usd) - Number(a.volume.usd);
    });
    dispatch(setTrendingPools(trendingPools));

    const hotPools = pools.sort((a, b) => {
      return Number(b.tvl) - Number(a.tvl);
    });
    dispatch(setHotPools(hotPools));

    const topGainers = pools.sort((a, b) => {
      return Number(b.emissions.rate) - Number(a.emissions.rate);
    });
    dispatch(setTopGainers(topGainers));
  };

  return {
    getPools,
  };
}
