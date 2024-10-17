import { useState, useEffect, useCallback } from 'react';
import { Address, PublicClient } from 'viem';
import { useContract } from './useContract';
import { formatPool, formatPosition } from '@/utils/helpers';
import { RawPool, FormattedPool, RawPosition, FormattedPosition } from './types';

import { AerodromePoolABI, LPSugarABI } from '@/constants/abis';
import { LP_SUGAR_ADDRESS } from '@/constants/addresses';

export function usePool(publicClient: PublicClient) {
  // State for storing all pools
  const [allPools, setAllPools] = useState<FormattedPool[]>([]);
  // State for storing the paginated v2 pools
  const [paginatedV2Pools, setPaginatedV2Pools] = useState<FormattedPool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const contract = useContract(LP_SUGAR_ADDRESS, LPSugarABI, publicClient);

  const fetchPoolStability = useCallback(
    async (poolAddress: Address): Promise<boolean> => {
      const poolContract = useContract(poolAddress, AerodromePoolABI, publicClient);
      try {
        const isStable = await poolContract.read.stable();
        return isStable as boolean;
      } catch (error) {
        console.error(`Error fetching stability for pool ${poolAddress}:`, error);
        return false; // Default to false if there's an error
      }
    },
    [publicClient]
  );

  const fetchAllPools = useCallback(
    async (batchSize: number = 1000) => {
      try {
        setLoading(true);
        setError(null);

        let offset = 0;
        let allPoolsData: FormattedPool[] = [];
        let hasMore = true;

        while (hasMore) {
          const poolsBatch = (await contract.read.all([BigInt(batchSize), BigInt(offset)])) as RawPool[];

          // Fetch stability information for each pool
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
      } catch (err) {
        console.error('Error fetching all pools:', err);
        setError('Failed to fetch pools');
      } finally {
        setLoading(false);
      }
    },
    [contract]
  );

  /**
   * Fetches and paginates v2 pools from the stored all pools data
   * @param limit The maximum number of pools to return (default: 10)
   * @param offset The starting index for fetching pools (default: 0)
   */
  const fetchV2Pools = useCallback(
    async (limit: number = 10, offset: number = 0) => {
      try {
        setLoading(true);
        setError(null);

        // If allPools is empty, fetch all pools first
        if (allPools.length === 0) {
          await fetchAllPools();
        }

        // Filter v2 pools and apply pagination
        const v2Pools = allPools.filter((pool) => pool.type === 'V2');
        const paginatedPools = v2Pools.slice(offset, offset + limit);

        setPaginatedV2Pools(paginatedPools);
      } catch (err) {
        console.error('Error fetching v2 pools:', err);
        setError('Failed to fetch v2 pools');
      } finally {
        setLoading(false);
      }
    },
    [allPools, fetchAllPools]
  );

  const fetchPositions = useCallback(
    async (account: Address, limit: number = 1000, offset: number = 0): Promise<FormattedPosition[]> => {
      try {
        // Fetch positions from the contract
        const positions = (await contract.read.positions([BigInt(limit), BigInt(offset), account])) as RawPosition[];
        // Format the position data
        return positions.map(formatPosition);
      } catch (err) {
        console.error('Error fetching positions:', err);
        throw new Error('Failed to fetch positions');
      }
    },
    [contract]
  );
  useEffect(() => {
    fetchV2Pools();
  }, [fetchV2Pools]);

  return {
    paginatedV2Pools,
    loading,
    error,
    fetchV2Pools,
    fetchPositions,
  };
}
