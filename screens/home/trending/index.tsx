import { StyleSheet, ScrollView, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { LQDPoolPairPaper } from '@/components';
import { poolPairs as originalPoolPairs } from '../dummy';
import Section from '../section';

const Trending = () => {
  const poolPairs = [...originalPoolPairs, ...originalPoolPairs];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <Section
        title="Trending"
        subtitle="by Volume"
        icon={<Ionicons name="arrow-up" size={18} color="#0C0507" />}
        isShowingAll
      >
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
    paddingTop: 36,
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
