import { View, Text, StyleSheet, ScrollView } from 'react-native';

import { adjustFontSizeForIOS } from '@/utils/helpers';
import RewardCard from './card';
import { aeroRewards, feesRewards } from './dummy';

const Rewards = ({ type }: { type: RewardVariants }) => {
  const rewards = {
    fees: feesRewards,
    aero: aeroRewards,
  }[type];

  const noOfRewards = rewards.length;
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
      <Text style={styles.header}>
        Rewards
        <Text style={styles.subHeader}> ({noOfRewards} pools)</Text>
      </Text>

      <View style={styles.rewardsContainer}>
        {rewards.map((reward) => (
          <RewardCard {...reward} key={reward.id} />
        ))}
      </View>
    </ScrollView>
  );
};

export default Rewards;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },

  contentContainer: {
    paddingBottom: 175,
    gap: 20,
  },

  header: {
    color: '#0F172A',
    fontSize: adjustFontSizeForIOS(20, 3),
    lineHeight: 23.2,
    fontWeight: '500',
  },

  subHeader: {
    color: '#94A3B8',
    fontSize: adjustFontSizeForIOS(16, 2),
    fontWeight: '500',
  },

  rewardsContainer: {
    gap: 24,
  },
});
