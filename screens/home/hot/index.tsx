import { StyleSheet, ScrollView, View } from 'react-native';

import { DollarSquareIcon } from '@/assets/icons';
import { LQDPoolPairPaper } from '@/components';
import useSystemFunctions from '@/hooks/useSystemFunctions';
import { formatAmount } from '@/utils/helpers';
import Section from '../section';

const Hot = () => {
  const { poolsState } = useSystemFunctions();

  const { hotPools } = poolsState;

  const pools: ILQDPoolPairPaper[] = hotPools.map((pool) => {
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
      <Section title="Hot" subtitle="by TVL" icon={<DollarSquareIcon />} isShowingAll>
        <View style={styles.mapContainer}>
          {pools.map((poolPair, index) => (
            <LQDPoolPairPaper key={index} {...poolPair} capitalMetric="tvl" />
          ))}
        </View>
      </Section>
    </ScrollView>
  );
};

export default Hot;

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
