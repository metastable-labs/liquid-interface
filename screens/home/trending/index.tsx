import { StyleSheet, ScrollView, View } from 'react-native';

import { LQDPoolPairPaper } from '@/components';
import { DirectUpIcon } from '@/assets/icons';
import { poolPairs as originalPoolPairs } from '../dummy';
import Section from '../section';

const Trending = () => {
  const poolPairs = [...originalPoolPairs, ...originalPoolPairs];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
      <Section title="Trending" subtitle="by Volume" icon={<DirectUpIcon />} isShowingAll>
        <View style={styles.mapContainer}>
          {poolPairs.map((poolPair, index) => (
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
