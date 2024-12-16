import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LQDButton, LQDFeedCard, LQDScrollView } from '@/components';
import { DiscoverUSDIcon } from '@/assets/icons';
import { adjustFontSizeForIOS, formatNumberWithSuffix } from '@/utils/helpers';
import { useFeed } from '@/services/feeds/queries';
import StatsCard from './stats-card';
import Comments from './comments';
import Loader from '../home/loader';

const StrategyDetail = ({ strategyId }: { strategyId: string }) => {
  const { data, isLoading, isFetching, isError, refetch } = useFeed(strategyId);

  const [showCommentSection, setShowCommentSection] = useState(false);

  const openCloseComment = () => {
    setShowCommentSection((prev) => !prev);
  };

  const strategyInfo = [
    {
      id: '1',
      variant: 'locked',
      title: 'Total value locked',
      value: `$${formatNumberWithSuffix(data?.metrics.tvl || 0)}`,
      active: false,
    },
    {
      id: '2',
      variant: 'risk',
      title: 'Risk profile',
      value: 'Stable',
      active: true,
    },
    {
      id: '3',
      variant: 'deposit',
      title: 'No. of deposits',
      value: Number(data?.metrics.totalDepositAmount || 0).toLocaleString(),
      active: false,
    },
    {
      id: '4',
      variant: 'curator',
      title: 'Curator fee',
      value: `${data?.performanceFee}%`,
      active: false,
    },
  ];

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <Text>error</Text>;
  }

  return (
    <LQDScrollView refreshing={isFetching} onRefresh={refetch} style={styles.container}>
      <LQDFeedCard handleCommentPress={openCloseComment} feed={data!} isDetailPage={true} />

      <View style={styles.infoContainer}>
        <Text style={styles.sectionTitle}>Strategy Info</Text>

        <View style={styles.statsWrapper}>
          {strategyInfo.map((stats: any, index) => (
            <StatsCard key={index} isActive={stats.active} variant={stats.variant} title={stats.title} value={stats.value} />
          ))}
        </View>

        <View style={styles.tokenContainer}>
          <View style={styles.tokenWrapper}>
            <DiscoverUSDIcon />
            <Text style={styles.token}>USDC</Text>
          </View>
          <View style={styles.tokenWrapper}>
            <Text style={styles.invested}>Invested:</Text>
            <Text style={styles.investedAmount}>3,000</Text>
          </View>
        </View>

        <View style={styles.buttonWrapper}>
          <LQDButton title="Withdraw" variant="primary" />
        </View>
      </View>

      <Comments strategyId={strategyId} openCloseComment={openCloseComment} showCommentSection={showCommentSection} />
    </LQDScrollView>
  );
};

export default StrategyDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  statsWrapper: {
    flexDirection: 'row',
    width: '100%',
    flexWrap: 'wrap',
    gap: 20,
  },

  infoContainer: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },

  emptyText: {
    fontSize: adjustFontSizeForIOS(16, 1),
    fontFamily: 'AeonikBold',
    fontWeight: '500',
    color: '#1E293B',
    lineHeight: 19.2,
    marginBottom: 5,
  },

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
  comment: {
    color: '#64748B',
    fontSize: adjustFontSizeForIOS(11, 3),
    fontFamily: 'AeonikRegular',
    fontWeight: '400',
    lineHeight: 16.8,
  },
  time: {
    color: '#64748B',
    fontSize: adjustFontSizeForIOS(11, 3),
    fontFamily: 'AeonikRegular',
    fontWeight: '400',
    lineHeight: 15.84,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 12,
  },
  token: {
    fontSize: adjustFontSizeForIOS(14, 2),
    fontWeight: '500',
    color: '#1A2001',
    lineHeight: 18.48,
    fontFamily: 'AeonikMedium',
  },
  invested: {
    fontSize: adjustFontSizeForIOS(14, 2),
    fontWeight: '500',
    color: '#64748B',
    lineHeight: 18.48,
    fontFamily: 'AeonikMedium',
  },
  investedAmount: {
    fontSize: adjustFontSizeForIOS(16, 2),
    fontWeight: '500',
    color: '#1A2001',
    lineHeight: 19.84,
    fontFamily: 'AeonikMedium',
  },
  tokenContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 5,
  },
  tokenWrapper: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  buttonWrapper: {
    marginTop: 20,
  },

  textInput: {
    flex: 1,
  },
  focusedInput: {
    borderColor: '#4691FE',
    borderWidth: 1.2,
  },
});
