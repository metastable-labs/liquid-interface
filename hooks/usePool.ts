import { useState } from 'react';
import { Address, PublicClient, formatUnits } from 'viem';
import { useLpSugarContract } from './useContract';
import { BasePool, CLPool, Pool, Position, V2Pool } from './types';
import { LP_SUGAR_ADDRESS } from '@/constants/addresses';

export function usePool(publicClient: PublicClient) {
  const [pools, setPools] = useState<BasePool[]>([]);
  const [positions, setPositions] = useState<Position[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const lpSugar = useLpSugarContract(LP_SUGAR_ADDRESS, publicClient);

  const fetchPools = async (BATCH_SIZE: number, offset: number) => {
    try {
      setLoading(true);
      setError(null);

      let v2Pools: BasePool[] = [];

      const batch = await lpSugar.getAll(BATCH_SIZE, offset);
      if (batch.length > 0) {
        const formattedPool = batch.map((pool) => ({
          address: pool.lp,
          symbol: pool.symbol,
          decimals: Number(pool.decimals),
          totalLiquidity: pool.liquidity.toString(),
          token0: {
            address: pool.token0,
            reserve: pool.reserve0.toString(),
            staked: pool.staked0.toString(),
          },
          token1: {
            address: pool.token1,
            reserve: pool.reserve1.toString(),
            staked: pool.staked1.toString(),
          },
          gauge: {
            address: pool.gauge,
            liquidity: pool.gauge_liquidity.toString(),
            isAlive: pool.gauge_alive,
          },
          fees: {
            address: pool.fee,
            token0: pool.token0_fees.toString(),
            token1: pool.token1_fees.toString(),
            poolFee: Number(pool.pool_fee),
            unstakedFee: Number(pool.unstaked_fee),
          },
          factory: pool.factory,
          emissions: {
            rate: pool.emissions.toString(),
            tokenAddress: pool.emissions_token,
          },
          type: Number(pool.tick) === 0 || -1 ? 'v2' : 'cl',
          isStable: Number(pool.type) === -1,
        }));

        // return only v2formattedpools
        const v2FormattedPools = formattedPool.filter((pool) => pool.type === 'v2');

        v2Pools = [...v2Pools, ...v2FormattedPools];

        setPools(v2Pools);
        setLoading(false);
        setError(null);
      }
    } catch (err) {
      console.error('Error fetching pools:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch pools'));
    } finally {
      setLoading(false);
    }
  };

  const fetchPositions = async (BATCH_SIZE: number, offset: number, account: Address) => {
    try {
      setLoading(true);
      setError(null);

      let allV2Positions: Position[] = [];

      const batch = await lpSugar.getPositions(BATCH_SIZE, offset, account);

      const processedPositions = await Promise.all(
        batch.map(async (pos) => {
          const pool = pools.find((p) => p.address.toLowerCase() === pos.lp.toLowerCase());
          return {
            id: pos.id.toString(),
            poolAddress: pos.lp,
            balance: pos.liquidity.toString(),
            stakedBalance: pos.staked.toString(),
            token0: {
              address: pool?.token0.address,
              balance: pos.amount0.toString(),
              stakedBalance: pos.staked0.toString(),
            },
            token1: {
              address: pool?.token1.address,
              balance: pos.amount1.toString(),
              stakedBalance: pos.staked1.toString(),
            },
            fees: {
              token0: pos.unstaked_earned0.toString(),
              token1: pos.unstaked_earned1.toString(),
            },
            reward: {
              address: pool?.gauge,
              earned: pos.emissions_earned.toString(),
            },
          };
        })
      );

      // Filter for V2 positions after processing
      const v2Positions = processedPositions.filter((position) => position.id === '0');
      allV2Positions = [...allV2Positions, ...v2Positions] as Position[];

      setPositions(allV2Positions);
    } catch (err) {
      console.error('Error fetching positions:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch positions'));
    } finally {
      setLoading(false);
    }
  };

  // Filter helpers

  const stablePools = pools.filter((pool) => pool.isStable);
  const volatilePools = pools.filter((pool) => !pool.isStable);

  // Helper function to get a pool by address
  const getPoolByAddress = (poolAddress: Address) => {
    return pools.find((pool) => pool.address.toLowerCase() === poolAddress.toLowerCase());
  };

  // Get all V2 positions
  const getV2Positions = () => {
    return positions.filter((position) => position.id === '0');
  };

  return {
    // Data
    pools,
    positions,
    // Pool filters
    stablePools,
    volatilePools,
    // position filters

    // Status
    loading,
    error,
    // Actions
    fetchPools,
    fetchPositions,
    getPoolByAddress,
  };
}
