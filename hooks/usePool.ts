import { useState, useEffect, useCallback, useMemo } from 'react';
import { Address, PublicClient } from 'viem';
import { useContract } from './useContract';
import { formatPool, formatPosition } from '@/utils/helpers';
import { RawPool, FormattedPool, RawPosition, FormattedPosition } from './types';
import { AerodromePoolABI, LPSugarABI } from '@/constants/abis';
import { LP_SUGAR_ADDRESS } from '@/constants/addresses';

export function usePool(publicClient: PublicClient, refreshInterval: number = 60000) {
  const [allPools, setAllPools] = useState<FormattedPool[]>([]);
  const [paginatedV2Pools, setPaginatedV2Pools] = useState<FormattedPool[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<number>(0);

  const contract = useContract(LP_SUGAR_ADDRESS, LPSugarABI, publicClient);

  const fetchPoolStability = useCallback(
    async (poolAddress: Address): Promise<boolean> => {
      const poolContract = useContract(poolAddress, AerodromePoolABI, publicClient);
      try {
        return (await poolContract.read.stable()) as boolean;
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
        return; // Only fetch if forced, empty, or refresh interval has passed
      }

      setLoading(true);
      setError(null);

      try {
        let offset = 0;
        let allPoolsData: FormattedPool[] = [];
        let hasMore = true;
        const batchSize = 1000;

        while (hasMore) {
          const poolsBatch = (await contract.read.all([BigInt(batchSize), BigInt(offset)])) as RawPool[];

          const poolsWithStability = await Promise.all(
            poolsBatch.map(async (pool) => {
              const isStable = await fetchPoolStability(pool.lp as Address);
              return formatPool(pool, isStable);
            })
          );

          allPoolsData = [...allPoolsData, ...poolsWithStability];
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
    [contract, fetchPoolStability, refreshInterval, lastUpdated, allPools.length]
  );

  const fetchV2Pools = useCallback(
    async (limit: number = 10, offset: number = 0) => {
      await fetchAllPools(); // This will refresh if necessary

      const v2Pools = allPools.filter((pool) => pool.type === 'V2');
      const paginatedPools = v2Pools.slice(offset, offset + limit);

      setPaginatedV2Pools(paginatedPools);
    },
    [allPools, fetchAllPools]
  );

  const fetchPositions = useCallback(
    async (account: Address, limit: number = 1000, offset: number = 0): Promise<FormattedPosition[]> => {
      try {
        const positions = (await contract.read.positions([BigInt(limit), BigInt(offset), account])) as RawPosition[];
        return positions.map(formatPosition);
      } catch (err) {
        console.error('Error fetching positions:', err);
        throw new Error('Failed to fetch positions');
      }
    },
    [contract]
  );

  // Function to manually trigger a refresh
  const refreshPools = useCallback(() => {
    fetchAllPools(true);
  }, [fetchAllPools]);

  // Set up automatic refresh
  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchAllPools();
    }, refreshInterval);

    return () => clearInterval(intervalId);
  }, [fetchAllPools, refreshInterval]);

  // Initial fetch
  useEffect(() => {
    fetchAllPools();
  }, [fetchAllPools]);

  const memoizedReturnValue = useMemo(
    () => ({
      paginatedV2Pools,
      loading,
      error,
      fetchV2Pools,
      fetchPositions,
      refreshPools,
      lastUpdated,
    }),
    [paginatedV2Pools, loading, error, fetchV2Pools, fetchPositions, refreshPools, lastUpdated]
  );

  return memoizedReturnValue;
}
