import { StyleSheet, ScrollView, View } from 'react-native';

import { TrendUpIcon } from '@/assets/icons';
import { LQDPoolPairPaper } from '@/components';
import useSystemFunctions from '@/hooks/useSystemFunctions';
import { formatAmount } from '@/utils/helpers';
import Section from '../section';

const TopGainers = () => {
  const { poolsState } = useSystemFunctions();

  const { topGainers } = poolsState;

  const pools: ILQDPoolPairPaper[] = topGainers.map((pool) => {
    return {
      primaryIconURL: pool.token0.logoUrl,
      secondaryIconURL: pool.token1.logoUrl,
      symbol: pool.symbol,
      apr: formatAmount(pool.emissions.rate, 2),
      fees: pool.fees.poolFee,
      volume: formatAmount(pool.volume.usd, 0),
      address: pool.address,
      isStable: pool.isStable,
    };
  });

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
      <Section title="Top gainers" subtitle="by APR" icon={<TrendUpIcon />} isShowingAll>
        <View style={styles.mapContainer}>
          {pools.map((poolPair, index) => (
            <LQDPoolPairPaper key={index} {...poolPair} />
          ))}
        </View>
      </Section>
    </ScrollView>
  );
};

export default TopGainers;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },

  contentContainer: {
    paddingBottom: 175,
    gap: 46,
  },

  mapContainer: {
    flex: 1,
    gap: 24,
    alignItems: 'stretch',
  },
});
