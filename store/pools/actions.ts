import useSystemFunctions from '@/hooks/useSystemFunctions';
import { usePool } from '@/hooks/usePool';
import { publicClient } from '@/init/viem';
import { PublicClient } from 'viem';
import { setHotPools, setLoadingPools, setTopGainers, setTrendingPools, setpools } from '.';

export function usePoolActions() {
  const { dispatch, userState } = useSystemFunctions();
  const { pools, positions, fetchPools, fetchPositions, getPoolByAddress } = usePool(publicClient as PublicClient);

  const getPools = async () => {
    try {
      dispatch(setLoadingPools(true));

      const pools = await fetchPools(1000, 0);

      if (!pools) return;

      console.log(pools[0].volume.usd);

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
    } catch (error: any) {
      //
    } finally {
      dispatch(setLoadingPools(false));
    }
  };

  return {
    getPools,
  };
}
