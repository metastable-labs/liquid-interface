import { useState, useEffect, useCallback } from 'react';
import { Address, PublicClient } from 'viem';
import { useContract } from './useContract';
import { formatBigInt, formatPercentage, formatAddress } from '@/utils/helpers';
import { RawPool, FormattedPool, RawPosition, FormattedPosition } from './types';

import { AerodromePoolABI, LPSugarABI } from '@/constants/abis';
import { LP_SUGAR_ADDRESS } from '@/constants/addresses';

function formatPool(pool: RawPool, isStable: boolean): FormattedPool {
  return {
    ...pool,
    lp: formatAddress(pool.lp),
    liquidity: formatBigInt(pool.liquidity, pool.decimals),
    type: pool.type === -1 ? 'CL' : 'V2',
    stable: isStable,
    token0: formatAddress(pool.token0),
    reserve0: formatBigInt(pool.reserve0, pool.decimals),
    staked0: formatBigInt(pool.staked0, pool.decimals),
    token1: formatAddress(pool.token1),
    reserve1: formatBigInt(pool.reserve1, pool.decimals),
    staked1: formatBigInt(pool.staked1, pool.decimals),
    gauge: formatAddress(pool.gauge),
    gauge_liquidity: formatBigInt(pool.gauge_liquidity, pool.decimals),
    fee: formatAddress(pool.fee),
    bribe: formatAddress(pool.bribe),
    factory: formatAddress(pool.factory),
    emissions: formatBigInt(pool.emissions, 18), // Assuming emissions are in 18 decimals
    emissions_token: formatAddress(pool.emissions_token),
    pool_fee: formatPercentage(pool.pool_fee),
    token0_fees: formatBigInt(pool.token0_fees, pool.decimals),
    token1_fees: formatBigInt(pool.token1_fees, pool.decimals),
  };
}

function formatPosition(position: RawPosition, decimals: number): FormattedPosition {
  return {
    id: position.id.toString(),
    lp: formatAddress(position.lp),
    liquidity: formatBigInt(position.liquidity, decimals),
    staked: formatBigInt(position.staked, decimals),
    amount0: formatBigInt(position.amount0, decimals),
    amount1: formatBigInt(position.amount1, decimals),
    staked0: formatBigInt(position.staked0, decimals),
    staked1: formatBigInt(position.staked1, decimals),
    unstaked_earned0: formatBigInt(position.unstaked_earned0, decimals),
    unstaked_earned1: formatBigInt(position.unstaked_earned1, decimals),
    emissions_earned: formatBigInt(position.emissions_earned, 18), // Assuming emissions are in 18 decimals
  };
}

export function useAerodromePools(publicClient: PublicClient) {
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
