import { useState, useEffect, useCallback, useMemo } from 'react';
import { Address, formatUnits, PublicClient } from 'viem';
import { useLpSugarContract, useAerodromePoolContract } from './useContract';
import { formatPool, formatPoolFee, formatPosition } from '@/utils/helpers';
import { RawPool, FormattedPool, RawPosition, FormattedPosition, Token, EnhancedFormattedPool, VolumeReturn } from './types';
import { LP_SUGAR_ADDRESS, OFFCHAIN_ORACLE_ADDRESS } from '@/constants/addresses';
import { useToken } from './useToken';

export function usePool(publicClient: PublicClient, account: Address, refreshInterval: number = 60000) {
  const [allPools, setAllPools] = useState<EnhancedFormattedPool[]>([]);
  const [paginatedV2Pools, setPaginatedV2Pools] = useState<EnhancedFormattedPool[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<number>(0);

  const { getTokenByAddress, tokens, loading: tokensLoading } = useToken(publicClient, account);

  const lpSugar = useMemo(() => useLpSugarContract(LP_SUGAR_ADDRESS, publicClient), [publicClient]);

  const calculateTVL = (reserve0: bigint, reserve1: bigint, token0: Token, token1: Token): string => {
    const value0 = Number(formatUnits(reserve0, token0.decimals)) * Number(token0.usd_price);
    const value1 = Number(formatUnits(reserve1, token1.decimals)) * Number(token1.usd_price);
    return (value0 + value1).toFixed(2);
  };

  const calculateVolume = (token0_fees: bigint, token1_fees: bigint, pool_fee: bigint, token0: Token, token1: Token): VolumeReturn => {
    const volume0 = Number(formatUnits(token0_fees, token0.decimals)) * Number(pool_fee);
    const volume1 = Number(formatUnits(token1_fees, token1.decimals)) * Number(pool_fee);

    const volumeUSD0 = volume0 * Number(token0.usd_price);
    const volumeUSD1 = volume1 * Number(token1.usd_price);

    const cumulativeVolumeUSD = volumeUSD0 + volumeUSD1;

    return {
      volume0: volume0.toFixed(2),
      volume1: volume1.toFixed(2),
      cumulativeVolumeUSD: cumulativeVolumeUSD.toFixed(2),
    };
  };

  const fetchPoolStability = useCallback(
    async (poolAddress: Address): Promise<boolean> => {
      try {
        const poolContract = useAerodromePoolContract(poolAddress, publicClient);
        return await poolContract.getStable();
      } catch (error) {
        console.error(`Error fetching stability for pool ${poolAddress}:`, error);
        return false;
      }
    },
    [publicClient]
  );

  const fetchAllPools = useCallback(
    async (forceRefresh: boolean = false) => {
      const now = Date.now();
      if (!forceRefresh && allPools.length > 0 && now - lastUpdated < refreshInterval) {
        return;
      }

      // Don't fetch if we don't have tokens loaded yet
      if (tokensLoading || tokens.length === 0) {
        return;
      }

      setLoading(true);
      setError(null);

      try {
        let offset = 0;
        let allPoolsData: EnhancedFormattedPool[] = [];
        let hasMore = true;
        const batchSize = 100;

        while (hasMore) {
          const poolsBatch = await lpSugar.getAll(batchSize, offset);
          if (!poolsBatch || !Array.isArray(poolsBatch)) {
            throw new Error('Invalid response from getAll');
          }

          const poolsWithStability = await Promise.all(
            poolsBatch.map(async (pool) => {
              try {
                const isStable = await fetchPoolStability(pool.lp as Address);
                console.log(isStable, 'pool stabilitity');
                const formattedPool = formatPool(pool, isStable);

                const token0 = getTokenByAddress(formattedPool.token0 as Address);
                const token1 = getTokenByAddress(formattedPool.token1 as Address);

                console.log(token0, token1);

                // if (!token0 || !token1) {
                //   console.error(`Token not found for pool ${formattedPool.lp}`);
                //   return null;
                // }

                const tvl = calculateTVL(pool.reserve0, pool.reserve1, token0!, token1!);
                const { volume0, volume1, cumulativeVolumeUSD } = calculateVolume(
                  pool.token0_fees,
                  pool.token1_fees,
                  pool.pool_fee,
                  token0!,
                  token1!
                );

                return {
                  ...formattedPool,
                  token0,
                  token1,
                  pool_fee: formatPoolFee(pool.pool_fee),
                  TVL: tvl,
                  volume0,
                  volume1,
                  cumulativeVolumeUSD,
                } as EnhancedFormattedPool;
              } catch (err) {
                console.error(`Error processing pool ${pool.lp}:`, err);
                return null;
              }
            })
          );

          const validPools = poolsWithStability.filter(Boolean) as EnhancedFormattedPool[];
          allPoolsData = [...allPoolsData, ...validPools];

          offset += batchSize;
          hasMore = poolsBatch.length === batchSize;
        }

        setAllPools(allPoolsData);
        setLastUpdated(now);
      } catch (err) {
        console.error('Error fetching all pools:', err);
        setError('Failed to fetch pools');
      } finally {
        setLoading(false);
      }
    },
    [lpSugar, fetchPoolStability, getTokenByAddress, tokens, tokensLoading, refreshInterval, allPools, lastUpdated]
  );

  const fetchV2Pools = useCallback(
    async (limit: number = 10, offset: number = 0) => {
      await fetchAllPools(); // This will refresh if necessary

      const v2Pools = allPools.filter((pool) => pool.type === 'V2');
      console.log(v2Pools, 'v2 pools from usePool');
      const paginatedPools = v2Pools.slice(offset, offset + limit);

      setPaginatedV2Pools(paginatedPools);
      return v2Pools;
    },
    [allPools, fetchAllPools]
  );

  const fetchPositions = useCallback(
    async (account: Address, limit: number = 1000, offset: number = 0): Promise<FormattedPosition[]> => {
      try {
        const rawPositions = await lpSugar.getPositions(limit, offset, account);
        if (!Array.isArray(rawPositions)) {
          throw new Error('Unexpected response format from getPositions');
        }
        const formattedPositions = rawPositions.map(formatPosition);
        return formattedPositions;
      } catch (err) {
        console.error('Error fetching positions:', err);
        throw new Error('Failed to fetch positions');
      }
    },
    [lpSugar, account]
  );

  // Function to manually trigger a refresh
  const refreshPools = useCallback(() => {
    fetchAllPools(true);
  }, [fetchAllPools]);

  // Set up automatic refresh
  useEffect(() => {
    if (!tokensLoading && tokens.length > 0) {
      const intervalId = setInterval(() => {
        fetchAllPools();
      }, refreshInterval);

      // Initial fetch
      fetchAllPools();

      return () => clearInterval(intervalId);
    }
  }, [fetchAllPools, refreshInterval, tokens, tokensLoading]);

  const memoizedReturnValue = useMemo(
    () => ({
      paginatedV2Pools,
      loading,
      error,
      fetchV2Pools,
      fetchPositions,
      refreshPools: () => fetchAllPools(true),
      lastUpdated,
    }),
    [paginatedV2Pools, loading, error, fetchV2Pools, fetchPositions, refreshPools, lastUpdated]
  );

  return memoizedReturnValue;
}
