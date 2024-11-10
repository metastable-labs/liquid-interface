import { View, StyleSheet, ScrollView } from 'react-native';

import Header from './header';
import Chart from './chart';
import Balance from './balance';
import PoolLiquidity from './pool-liquidity';
import PoolStats from './stats';
import useSystemFunctions from '@/hooks/useSystemFunctions';
import { Address, formatEther } from 'viem';

const PoolDetail = ({ poolId }: PoolID) => {
  const { poolsState, accountState } = useSystemFunctions();
  const { selectedPool: pool } = poolsState;

  const symbol = pool?.symbol.split('-')[1].replace('/', ' / ');
  const title = symbol?.split('/');

  const getTokenBalance = (address?: Address) => {
    const balance = accountState.tokens.find((token) => token.address === address)?.balance || 0;
    return Number(balance);
  };

  const getTokenUSDValue = (address?: Address) => {
    const token = accountState.tokens.find((token) => token.address === address);
    const balance = Number(token?.balance || 0) * Number(token?.usdPrice || 0);
    return balance;
  };

  const POOL: PoolDetails = {
    primaryIconURL: pool?.token0.logoUrl || '',
    primaryBalance: getTokenBalance(pool?.token0.address),
    primaryUSDValue: getTokenUSDValue(pool?.token0.address),
    secondaryIconURL: pool?.token1.logoUrl || '',
    secondaryBalance: getTokenBalance(pool?.token1.address),
    secondaryUSDValue: getTokenUSDValue(pool?.token1.address),
    condition: pool?.isStable ? 'stable' : 'volatile',
    fee: 0,
    aero: 10,
    stakedAero: 300,
    availableAero: 4_090,
    primaryTitle: title ? title[0] : '',
    secondaryTitle: title ? title[1] : '',
    symbol: pool?.symbol.split('-')[1].replace('/', ' / ') || '',
    volume: Number(formatEther(BigInt(pool?.totalVolumeUSD || 0))),
    tvl: Number(pool?.tvl || 0),
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

        <PoolStats fee={POOL.fee} tvl={POOL.tvl} volume={POOL.volume} />
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
