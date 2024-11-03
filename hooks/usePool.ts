import { useState } from 'react';
import { Address, PublicClient, formatUnits } from 'viem';
import { useLpSugarContract } from './useContract';
import { BasePool, CLPool, Pool, Position, V2Pool } from './types';
import { LP_SUGAR_ADDRESS } from '@/constants/addresses';
import { useToken } from './useToken';
import { formatPoolFee } from '@/utils/helpers';
import useSystemFunctions from './useSystemFunctions';

export function usePool(publicClient: PublicClient) {
  const { smartAccountState } = useSystemFunctions();
  const [pools, setPools] = useState<BasePool[]>([]);
  const [positions, setPositions] = useState<Position[]>([]);

  const lpSugar = useLpSugarContract(LP_SUGAR_ADDRESS, publicClient);
  const { fetchTokens, getTokenByAddress, getTokensByAddresses, getTokenPrice } = useToken(publicClient);

  const fetchPools = async (BATCH_SIZE: number, offset: number): Promise<BasePool[] | undefined> => {
    try {
      let v2Pools: BasePool[] = [];

      const batch: any = await lpSugar.getAll(BATCH_SIZE, offset);

      // TODO: 1. Get TVL for each pool.
      /**TVL is caluclated by (token0.reserve * token0price) + (token1.reserve * token1price) */
      if (batch.length > 0) {
        // Get all unique token addresses from the batch
        const tokenAddresses = [...new Set(batch.flatMap((pool: any) => [pool.token0, pool.token1]))];

        // Fetch token prices for all tokens in batch
        await fetchTokens(tokenAddresses.length, 0);

        const formattedPool = batch.map((pool: any) => {
          // Calculate TVL using token reserves and prices
          const token0Data = getTokenByAddress(pool.token0);
          const token1Data = getTokenByAddress(pool.token1);

          // Format reserves using correct token decimals
          const token0Reserve = Number(formatUnits(pool.reserve0, token0Data?.decimals ?? 18));
          const token1Reserve = Number(formatUnits(pool.reserve1, token1Data?.decimals ?? 18));

          // Format staked amounts using correct token decimals
          const token0Staked = Number(formatUnits(pool.staked0, token0Data?.decimals ?? 18));
          const token1Staked = Number(formatUnits(pool.staked1, token1Data?.decimals ?? 18));
          // Format fees using correct token decimals
          const token0Fees = Number(formatUnits(pool.token0_fees, token0Data?.decimals ?? 18));
          const token1Fees = Number(formatUnits(pool.token1_fees, token1Data?.decimals ?? 18));

          // Calculate volume from fees
          // Convert basis points to decimal percentage (30 -> 0.003)
          const poolFeePercentage = Number(formatPoolFee(pool.pool_fee));

          // Calculate volumes: fees / fee_percentage
          const token0Volume = token0Fees / (poolFeePercentage / 100);
          const token1Volume = token1Fees / (poolFeePercentage / 100);

          // Calculate USD values
          const token0VolumeUSD = token0Volume * Number(token0Data?.usdPrice ?? 0);
          const token1VolumeUSD = token1Volume * Number(token1Data?.usdPrice ?? 0);
          const totalVolumeUSD = token0VolumeUSD + token1VolumeUSD;

          // Calculate TVL using formatted reserves and prices
          const tvl = token0Reserve * Number(token0Data?.usdPrice ?? 0) + token1Reserve * Number(token1Data?.usdPrice ?? 0);

          const totalSecondsInAYear = 355 * 24 * 60 * 60;
          const emission = Number(formatUnits(pool.emissions, 18).toString());
          const apr = (emission * totalSecondsInAYear) / 10000;

          const symbol = pool.symbol.split('-')[1].replace('/', ' / ');

          return {
            address: pool.lp,
            symbol,
            decimals: Number(pool.decimals),
            totalLiquidity: formatUnits(pool.liquidity, Number(pool.decimals)),
            tvl: tvl.toString(),
            token0: {
              address: pool.token0,
              reserve: token0Reserve.toString(),
              staked: token0Staked.toString(),
              price: token0Data?.usdPrice ?? '0',
              logoUrl: token0Data?.logoUrl!,
            },
            token1: {
              address: pool.token1,
              reserve: token1Reserve.toString(),
              staked: token1Staked.toString(),
              price: token1Data?.usdPrice ?? '0',
              logoUrl: token1Data?.logoUrl!,
            },
            gauge: {
              address: pool.gauge,
              liquidity: formatUnits(pool.gauge_liquidity, Number(pool.decimals)),
              isAlive: pool.gauge_alive,
            },
            fees: {
              address: pool.fee,
              token0: token0Fees.toString(),
              token1: token1Fees.toString(),
              poolFee: Number(formatPoolFee(pool.pool_fee)), // basis points (e.g., 30 = 0.3%)
              unstakedFee: Number(pool.unstaked_fee),
            },
            volume: {
              token0: token0Volume.toString(),
              token1: token1Volume.toString(),
              usd: totalVolumeUSD.toString(),
            },
            factory: pool.factory,
            emissions: {
              rate: apr.toString(),
              tokenAddress: pool.emissions_token,
            },
            type: Number(pool.tick) === 0 || -1 ? 'v2' : 'cl',
            isStable: Number(pool.type) === -1,
          };
        });

        // return only v2formattedpools
        const v2FormattedPools = formattedPool.filter((pool) => pool.type === 'v2');

        v2Pools = [...v2Pools, ...v2FormattedPools];

        setPools(v2Pools);
      }

      return v2Pools;
    } catch (err) {
      console.error('Error fetching pools:', err);
    }
  };

  const fetchPositions = async (BATCH_SIZE: number, offset: number) => {
    try {
      const account = smartAccountState?.address || '0xF831A8c0788a44483Df72f0D129F03Cb0e01bBe2';

      let allV2Positions: Position[] = [];

      if (!account) {
        return allV2Positions;
      }

      const batch: any = await lpSugar.getPositions(BATCH_SIZE, offset, account);

      const processedPositions = await Promise.all(
        batch.map(async (pos: any) => {
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

      return allV2Positions;
    } catch (err) {
      console.error('Error fetching positions:', err);
    }
  };

  const stablePools = pools.filter((pool) => pool.isStable);
  const volatilePools = pools.filter((pool) => !pool.isStable);

  const getPoolByAddress = (poolAddress: Address) => {
    return pools.find((pool) => pool.address.toLowerCase() === poolAddress.toLowerCase());
  };

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
    getV2Positions,
    // Actions
    fetchPools,
    fetchPositions,
    getPoolByAddress,
  };
}
