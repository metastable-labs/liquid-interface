import { View, StyleSheet, ScrollView } from 'react-native';

import Header from './header';
import Chart from './chart';
import Balance from './balance';
import PoolLiquidity from './pool-liquidity';
import PoolStats from './stats';
import useSystemFunctions from '@/hooks/useSystemFunctions';
import { Address, formatEther } from 'viem';
import { roundUp } from '@/utils/helpers';

const PoolDetail = ({ poolId }: PoolID) => {
  const { poolsState, accountState } = useSystemFunctions();
  const { selectedPool: pool } = poolsState;

  const symbol = pool?.symbol.split('-')[1].replace('/', ' / ');
  const title = symbol?.split('/');

  const getTokenBalance = (address?: Address) => {
    const balance = accountState.tokens?.data?.find((token) => token.address === address)?.balance || 0;
    return Number(balance);
  };

  const getTokenUSDValue = (address?: Address) => {
    const token = accountState.tokens?.data?.find((token) => token.address === address);
    const balance = Number(token?.balance || 0) * Number(token?.usdPrice || 0);
    return balance;
  };

  const POOL: PoolDetails = {
    tokenAIconURL: pool?.token0.logoUrl || '',
    tokenABalance: getTokenBalance(pool?.token0.address),
    tokenAUSDValue: getTokenUSDValue(pool?.token0.address),
    tokenBIconURL: pool?.token1.logoUrl || '',
    tokenBBalance: getTokenBalance(pool?.token1.address),
    tokenBUSDValue: getTokenUSDValue(pool?.token1.address),
    condition: pool?.isStable ? 'stable' : 'volatile',
    fee: Number(pool?.totalFeesUSD).toFixed(2),
    poolFee: roundUp(Number(pool?.poolFee)),
    tokenATitle: title ? title[0] : '',
    tokenBTitle: title ? title[1] : '',
    symbol: pool?.symbol.split('-')[1].replace('/', ' / ') || '',
    volume: Number(pool?.totalVolumeUSD || 0),
    tvl: Number(pool?.tvl || 0),
    tx: Number(pool?.txCount),
    reserveA: Number(pool?.token0.reserve),
    reserveB: Number(pool?.token1.reserve),
    reserveAUSD: Number(pool?.token0.reserveUSD),
    reserveBUSD: Number(pool?.token1.reserveUSD),
    poolAddress: pool?.address!,
  };

  if (!pool) return null;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.containerContent} showsVerticalScrollIndicator={false}>
      <View style={styles.topContainer}>
        <Header {...POOL} />

        <Chart />
      </View>

      <View style={styles.bottomContainer}>
        <View style={styles.balanceAndPool}>
          <Balance {...POOL} />

          <PoolLiquidity {...POOL} />
        </View>

        <PoolStats fee={POOL.fee} tvl={POOL.tvl} volume={POOL.volume} tx={POOL.tx} />
      </View>
    </ScrollView>
  );
};

export default PoolDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },

  containerContent: {
    gap: 54,
    paddingBottom: 200,
  },

  topContainer: {
    gap: 36,
  },

  bottomContainer: {
    alignSelf: 'stretch',
    alignItems: 'flex-end',
    gap: 41,
  },

  balanceAndPool: {
    alignSelf: 'stretch',
    alignItems: 'center',
    gap: 24,
  },

  actionsContainer: {
    position: 'relative',
    bottom: 0,
    flexDirection: 'row',
    gap: 11,
  },

  action: {
    flex: 1,
  },
});
