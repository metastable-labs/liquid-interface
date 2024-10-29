import { StyleSheet, ScrollView, View } from 'react-native';

import { LQDPoolPairPaper } from '@/components';
import useSystemFunctions from '@/hooks/useSystemFunctions';
import { DirectUpIcon } from '@/assets/icons';
import { formatAmount } from '@/utils/helpers';
import Section from '../section';

const Trending = () => {
  const { poolsState } = useSystemFunctions();

  const { trendingPools } = poolsState;

  const pools: ILQDPoolPairPaper[] = trendingPools.map((pool) => {
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
      <Section title="Trending" subtitle="by Volume" icon={<DirectUpIcon />} isShowingAll>
        <View style={styles.mapContainer}>
          {pools.map((poolPair, index) => (
            <LQDPoolPairPaper key={index} {...poolPair} />
          ))}
        </View>
      </Section>
    </ScrollView>
  );
};

export default Trending;

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
