import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { LQDButton } from '@/components';
import FeedStep from '@/components/feed-card/feed-step';
import { steps } from '../home/dummy';
import { adjustFontSizeForIOS } from '@/utils/helpers';
import { ActionIconVariant } from '@/components/action-card/types';
import Loader from './loader';

const RreviewStrategy = () => {
  const [loading, setLoading] = useState(false);
  if (loading) {
    return <Loader />;
  }

  const openModal = () => {
    setLoading((prev) => !prev);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <View style={styles.feedStep}>
          {steps.map((step, index: number) => (
            <FeedStep
              key={index}
              variant={step.variant as ActionIconVariant}
              tokenA={step.tokenA}
              tokenB={step.tokenB}
              tokenAIconURL={step.tokenAIconURL}
              tokenBIconURL={step.tokenBIconURL}
              isLast={step.isLast}
            />
          ))}
        </View>

        <View style={styles.contentWrapper}>
          <Text style={styles.title}>Moonwell - USDC</Text>
          <View style={styles.estWrapper}>
            <Text style={styles.estimate}>Est. APY</Text>
            <Text style={styles.percentage}>65.45%</Text>
          </View>
          <Text style={styles.description}>This strategy starts as an ease in for first and second quaterss of 2025</Text>
          <Text style={styles.description}>This strategy starts as an ease in for first and second quaterss of 2025</Text>
          <Text style={styles.description}>This strategy starts as an ease in for first and second quaterss of 2025</Text>
        </View>
      </View>

      <View style={{ paddingBottom: 40 }}>
        <LQDButton title="Publish" variant="secondary" onPress={openModal} />
      </View>
    </View>
  );
};

export default RreviewStrategy;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 16,
  },
  feedStep: {
    borderColor: '#F1F5F9',
    borderWidth: 1,
    borderRadius: 10,
    overflow: 'hidden',
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginTop: 20,
  },
  contentWrapper: {
    borderColor: '#F1F5F9',
    borderWidth: 1,
    borderRadius: 10,
    overflow: 'hidden',
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginTop: 20,
    gap: 15,
  },
  estWrapper: { flexDirection: 'row', gap: 10 },
  title: {
    fontSize: adjustFontSizeForIOS(15, 3),
    fontFamily: 'AeonikBold',
    fontWeight: '500',
    color: '#1E293B',
  },
  address: {
    color: '#64748B',
    fontSize: adjustFontSizeForIOS(11, 3),
    fontFamily: 'AeonikRegular',
    fontWeight: '400',
    lineHeight: 16.8,
  },
  time: {
    color: '#64748B',
    fontSize: adjustFontSizeForIOS(12, 3),
    fontFamily: 'AeonikRegular',
    fontWeight: '400',
    lineHeight: 15.84,
  },
  estimate: {
    color: '#64748B',
    fontSize: adjustFontSizeForIOS(12, 2),
    fontFamily: 'AeonikRegular',
    fontWeight: '500',
    lineHeight: 15.84,
  },
  actionText: {
    color: '#64748B',
    fontSize: adjustFontSizeForIOS(12, 2),
    fontFamily: 'AeonikRegular',
    fontWeight: '500',
    lineHeight: 15.84,
  },
  percentage: {
    color: '#4691FE',
    fontSize: adjustFontSizeForIOS(14, 3),
    fontFamily: 'AeonikRegular',
    fontWeight: '500',
    lineHeight: 15.84,
  },
  description: {
    color: '#64748B',
    fontSize: adjustFontSizeForIOS(14, 2),
    fontFamily: 'AeonikRegular',
    fontWeight: '400',
    lineHeight: 18.4,
  },
});
