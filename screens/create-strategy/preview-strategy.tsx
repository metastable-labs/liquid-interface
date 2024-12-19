import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

import { LQDButton } from '@/components';
import { adjustFontSizeForIOS } from '@/utils/helpers';
import useSystemFunctions from '@/hooks/useSystemFunctions';
import Loader from './loader';
import { useWriteFeed } from '@/services/feeds/queries';
import PreviewFeedStep from '@/components/feed-card/preview-feed-step';

const SUPPLY = 0; // Supply assets
const WITHDRAW = 1; // Withdraw assets
const BORROW = 2; // Borrow assets
const REPAY = 3; // Repay debt
const STAKE = 4; // Stake assets
const UNSTAKE = 5; // Unstake assets
const SWAP = 6; // Swap assets
const CLAIM = 7; // Claim rewards

const getActionType = (action: 'deposit' | 'stake' | 'borrow' | 'supply') => {
  switch (action) {
    case 'deposit':
      return SUPPLY;
    case 'stake':
      return STAKE;
    case 'borrow':
      return BORROW;
    case 'supply':
      return SUPPLY;
    default:
      return SUPPLY;
  }
};

const RreviewStrategy = () => {
  const param = useLocalSearchParams();
  const { appState, accountState } = useSystemFunctions();
  const { postStrategy, loading } = useWriteFeed();

  const { strategyActions } = appState;
  const { tokens } = accountState;

  const strategySteps = () => {
    const steps = strategyActions.map((item: StrategyAction, index) => {
      const assetsIn = tokens.data?.find((token) => item.assetsIn[0] == token.address);

      return {
        variant: item.action,
        token: assetsIn?.symbol || 'USDC',
        protocolTitle: item.protocol.title,
        tokenIconURL: assetsIn?.logoUrl || '',
        protocolIcon: item.protocol.icon,
        isLast: index === strategyActions.length - 1,
      };
    });

    return steps;
  };

  const handlePublish = () => {
    const steps = strategyActions.map((item: StrategyAction) => {
      return {
        connector: '0x01249b37d803573c071186BC4C3ea92872B93F5E' as `0x${string}`,
        actionType: getActionType(item.action),
        assetsIn: item.assetsIn,
        amountRatio: BigInt(5000),
        assetOut: '0xF877ACaFA28c19b96727966690b2f44d35aD5976' as `0x${string}`,
        data: '0x' as `0x${string}`,
      };
    });

    const data: StrategyBody = {
      name: param.name as string,
      description: param.description as string,
      minDeposit: BigInt(1000),
      maxTvl: BigInt(1000000),
      performanceFee: BigInt(20),
      steps,
    };

    postStrategy(data);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <View style={styles.feedStep}>
          {strategySteps().map((step, index: number) => (
            <PreviewFeedStep key={index} {...step} isLast={step.isLast} />
          ))}
        </View>

        <View style={styles.contentWrapper}>
          <Text style={styles.title}>{param.name}</Text>
          <View style={styles.estWrapper}>
            <Text style={styles.estimate}>Est. APY</Text>
            <Text style={styles.percentage}>65.45%</Text>
          </View>
          <Text style={styles.description}>{param.description}</Text>
        </View>
      </View>

      <View style={{ paddingBottom: 40 }}>
        <LQDButton title="Publish" variant="secondary" onPress={handlePublish} />
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
