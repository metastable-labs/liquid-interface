import { StyleSheet, ScrollView, View } from 'react-native';

import { DollarSquareIcon } from '@/assets/icons';
import { LQDPoolPairPaper } from '@/components';
import { poolPairs as originalPoolPairs } from '../dummy';
import Section from '../section';

const Hot = () => {
  const poolPairs = [...originalPoolPairs, ...originalPoolPairs];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
      <Section title="Hot" subtitle="by TVL" icon={<DollarSquareIcon />} isShowingAll>
        <View style={styles.mapContainer}>
          {poolPairs.map((poolPair, index) => (
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
