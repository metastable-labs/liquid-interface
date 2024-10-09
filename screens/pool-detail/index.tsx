import { View, Text, StyleSheet, ScrollView } from 'react-native';

import { ILQDButton } from '@/components/button/types';
import { LQDButton } from '@/components';
import Header from './header';
import Chart from './chart';
import Balance from './balance';
import PoolLiquidity from './pool-liquidity';
import PoolStats from './stats';

const POOL: IPool = {
  id: '1',
  primaryIconURL:
    'https://res.cloudinary.com/dxnd4k222/image/upload/v1727119033/is3tphz7tf06jpj5g7x3.png',
  primaryTitle: 'USDC',
  primaryBalance: 100,
  primaryUSDValue: 100,
  secondaryIconURL:
    'https://res.cloudinary.com/dxnd4k222/image/upload/v1727119032/uwficdtvggd49apjfpt4.png',
  secondaryTitle: 'cbBTC',
  secondaryBalance: 23,
  secondaryUSDValue: 23 * 40_000,
  condition: 'stable',
  fee: 0.3,
  aero: 10,
  stakedAero: 300,
  availableAero: 4_090,
};

const PoolDetail = ({ poolId }: IPoolDetail) => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.containerContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.topContainer}>
        <Header {...POOL} />

        <Chart />
      </View>

      <View style={styles.bottomContainer}>
        <View style={styles.balanceAndPool}>
          <Balance {...POOL} />

          <PoolLiquidity {...POOL} />
        </View>

        <PoolStats />
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
