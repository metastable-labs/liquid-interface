import { useCallback, useEffect, useState } from 'react';
import { Address, PublicClient } from 'viem';
import { useLpSugarContract, useOffchainOracleContract } from './useContract';
import { Token, Pool, CLPool, V2Pool } from './types';
import { CONNECTORS_BASE, LP_SUGAR_ADDRESS, OFFCHAIN_ORACLE_ADDRESS } from '@/constants/addresses';

const BATCH_SIZE = 100;

export function usePool(publicClient: PublicClient) {
  const [pools, setPools] = useState<Pool[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const lpSugar = useLpSugarContract(LP_SUGAR_ADDRESS, publicClient);

  const processPoolData = (rawPool: any): Pool => {
    const basePool = {
      address: rawPool.lp,
      symbol: rawPool.symbol,
      decimals: Number(rawPool.decimals),
      totalLiquidity: rawPool.liquidity.toString(),
      token0: {
        address: rawPool.token0,
        reserve: rawPool.reserve0.toString(),
        staked: rawPool.staked0.toString(),
      },
      token1: {
        address: rawPool.token1,
        reserve: rawPool.reserve1.toString(),
        staked: rawPool.staked1.toString(),
      },
      gauge: {
        address: rawPool.gauge,
        liquidity: rawPool.gauge_liquidity.toString(),
        isAlive: rawPool.gauge_alive,
      },
      fees: {
        address: rawPool.fee,
        token0: rawPool.token0_fees.toString(),
        token1: rawPool.token1_fees.toString(),
        poolFee: Number(rawPool.pool_fee),
        unstakedFee: Number(rawPool.unstaked_fee),
      },
      factory: rawPool.factory,
      emissions: {
        rate: rawPool.emissions.toString(),
        tokenAddress: rawPool.emissions_token,
      },
    };

    // Check if it's a V2 pool (tick === 0)
    if (Number(rawPool.tick) === 0) {
      return {
        ...basePool,
        type: 'v2',
        isStable: Number(rawPool.type) === -1, // -1 for stable, 0 for volatile
      } as V2Pool;
    } else {
      return {
        ...basePool,
        type: 'cl',
        tickSpacing: Number(rawPool.type),
        currentTick: Number(rawPool.tick),
        sqrtRatio: rawPool.sqrt_ratio.toString(),
      } as CLPool;
    }
  };

  const fetchPools = async () => {
    try {
      setLoading(true);
      setError(null);

      let allPools: Pool[] = [];
      let offset = 0;
      let hasMore = true;

      while (hasMore) {
        const batch = await lpSugar.getAll(BATCH_SIZE, 0);
        if (batch.length === 0) {
          hasMore = false;
          break;
        }

        const processedPools = batch.map(processPoolData);
        allPools = [...allPools, ...processedPools];
        offset += BATCH_SIZE;
      }

      setPools(allPools);
    } catch (err) {
      console.error('Error fetching pools:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch pools'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPools();
  }, [fetchPools]);

  // Filter helpers
  const v2Pools = pools.filter((pool): pool is V2Pool => pool.type === 'v2');
  const clPools = pools.filter((pool): pool is CLPool => pool.type === 'cl');
  const stablePools = v2Pools.filter((pool) => pool.isStable);
  const volatilePools = v2Pools.filter((pool) => !pool.isStable);

  return {
    pools,
    v2Pools,
    clPools,
    stablePools,
    volatilePools,
    loading,
    error,
    refetch: fetchPools,
  };
}
