import { StyleSheet, View, FlatList } from 'react-native';

import { TrendUpIcon } from '@/assets/icons';
import { LQDPoolPairPaper } from '@/components';
import useSystemFunctions from '@/hooks/useSystemFunctions';
import { formatAmount } from '@/utils/helpers';
import { usePoolActions } from '@/store/pools/actions';
import Section from '../section';

const TopGainers = () => {
  const { poolsState } = useSystemFunctions();
  const { getPaginatedTopGainers } = usePoolActions();

  const { topGainers, refreshingPools } = poolsState;

  const pools: ILQDPoolPairPaper[] = topGainers.data.map((pool) => {
    const symbol = pool.symbol.split('-')[1].replace('/', ' / ');

    return {
      primaryIconURL: pool.token0.logoUrl,
      secondaryIconURL: pool.token1.logoUrl,
      symbol,
      apr: formatAmount(pool.emissions.rate, 2),
      fees: pool.fees.poolFee,
      volume: formatAmount(pool.volume.usd, 0),
      address: pool.address,
      isStable: pool.isStable,
    };
  });

  return (
    <View style={styles.container}>
      <Section title="Top gainers" subtitle="by APR" icon={<TrendUpIcon />} isShowingAll>
        <FlatList
          data={pools}
          renderItem={({ item }) => <LQDPoolPairPaper {...item} />}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={{ gap: 24 }}
          onEndReached={() => getPaginatedTopGainers()}
          onEndReachedThreshold={0.1}
          refreshing={refreshingPools}
          onRefresh={() => getPaginatedTopGainers(true)}
          bounces={true}
          showsVerticalScrollIndicator={false}
        />
      </Section>
    </View>
  );
};

export default TopGainers;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    paddingBottom: 170,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    gap: 46,
  },
});
