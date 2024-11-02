import { StyleSheet, View, Text, FlatList, ScrollView, TouchableOpacity } from 'react-native';

import useSystemFunctions from '@/hooks/useSystemFunctions';
import { adjustFontSizeForIOS, formatAmount, formatAmountWithWholeAndDecimal } from '@/utils/helpers';
import { LQDButton, LQDPoolPairCard, LQDPoolPairPaper } from '@/components';
import { CaretRightIcon, DirectUpIcon, DollarSquareIcon, TrendUpIcon } from '@/assets/icons';
import Section from './section';
import { useEffect } from 'react';
import { useAccountActions } from '@/store/account/actions';

const Home = () => {
  const { router, poolsState, smartAccountState, accountState } = useSystemFunctions();
  const { getTokens, getPositions } = useAccountActions();

  const { trendingPools, hotPools, topGainers } = poolsState;

  const { whole, decimal } = formatAmountWithWholeAndDecimal(accountState.tokenBalance.toFixed(2));

  const top10TrendingPools: ILQDPoolPairPaper[] = trendingPools.data.slice(0, 10).map((pool) => {
    const symbol = pool.symbol.split('-')[1].replace('/', ' / ');

    return {
      primaryIconURL: pool.token0.logoUrl,
      secondaryIconURL: pool.token1.logoUrl,
      symbol,
      apr: Number(pool.emissions.rate),
      fees: pool.fees.poolFee,
      volume: formatAmount(pool.volume.usd, 0),
      address: pool.address,
      isStable: pool.isStable,
    };
  });

  const top10HotPools: ILQDPoolPairPaper[] = hotPools.data.slice(0, 10).map((pool) => {
    const symbol = pool.symbol.split('-')[1].replace('/', ' / ');

    return {
      primaryIconURL: pool.token0.logoUrl,
      secondaryIconURL: pool.token1.logoUrl,
      symbol,
      apr: formatAmount(pool.emissions.rate, 2),
      fees: pool.fees.poolFee,
      volume: formatAmount(pool.volume.usd, 0),
      address: pool.address,
      isStable: pool.isStable,
    };
  });

  const top10Gainers: ILQDPoolPairCard[] = topGainers.data.slice(0, 10).map((pool) => {
    const symbol = pool.symbol.split('-')[1].replace('/', ' / ');

    return {
      primaryIconURL: pool.token0.logoUrl,
      secondaryIconURL: pool.token1.logoUrl,
      symbol,
      increased: pool.gauge.isAlive,
      change: 2.3,
      address: pool.address,
    };
  });

  const sections = [
    {
      title: 'Top gainers',
      subtitle: 'by APR',
      icon: <TrendUpIcon />,
      action: () => router.push('/(tabs)/home/top'),
      children: (
        <FlatList
          data={top10Gainers}
          horizontal
          renderItem={({ item }) => <LQDPoolPairCard {...item} />}
          keyExtractor={(item, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 10 }}
        />
      ),
    },

    {
      title: 'Trending',
      subtitle: 'by Volume',
      icon: <DirectUpIcon />,
      action: () => router.push('/(tabs)/home/trending'),
      children: (
        <View style={styles.mapContainer}>
          {top10TrendingPools.map((poolPair, index) => (
            <LQDPoolPairPaper key={index} {...poolPair} />
          ))}
        </View>
      ),
    },

    {
      title: 'Hot',
      subtitle: 'by TVL',
      icon: <DollarSquareIcon />,
      action: () => router.push('/(tabs)/home/hot'),
      children: (
        <View style={styles.mapContainer}>
          {top10HotPools.map((poolPair, index) => (
            <LQDPoolPairPaper key={index} {...poolPair} />
          ))}
        </View>
      ),
    },
  ];

  useEffect(
    function fetchBalances() {
      getTokens();
      getPositions();
    },
    [smartAccountState.address]
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
      <View style={styles.balanceAndActionContainer}>
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceTitle}>Total Balance</Text>

          <TouchableOpacity onPress={() => router.push('/(tabs)/holdings')} style={styles.balanceValueContainer}>
            <Text style={styles.balanceWholeValue}>
              ${whole}.<Text style={styles.balanceDecimalValue}>{decimal}</Text>
            </Text>

            <CaretRightIcon width={20} height={20} fill="#F8FAFC" />
          </TouchableOpacity>
        </View>

        <LQDButton
          title="Add money"
          onPress={() => router.push('/deposit/debit')}
          variant="tertiaryOutline"
          icon="money"
          iconColor="#334155"
          style={{ alignSelf: 'stretch' }}
        />
      </View>

      {sections.map((section, index) => (
        <Section key={index} {...section} />
      ))}
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 34,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },

  contentContainer: {
    paddingBottom: 175,
    gap: 40,
  },

  balanceAndActionContainer: {
    alignSelf: 'stretch',
    gap: 24,
  },

  balanceContainer: {
    alignSelf: 'stretch',
    gap: 12,
    padding: 16,
    backgroundColor: '#4691FE',
    borderRadius: 16,
    shadowColor: 'rgba(2, 6, 23, 0.06)',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 3,
  },

  balanceTitle: {
    color: '#F8FAFC',
    fontSize: adjustFontSizeForIOS(13, 2),
    lineHeight: 16.12,
    fontFamily: 'AeonikRegular',
  },

  balanceValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },

  balanceWholeValue: {
    color: '#FFF',
    fontSize: adjustFontSizeForIOS(36, 4),
    lineHeight: 40.32,
    fontWeight: '700',
    fontFamily: 'QuantaGroteskProBold',
  },

  balanceDecimalValue: {
    color: '#FFF',
    fontSize: adjustFontSizeForIOS(24, 3),
    letterSpacing: -0.6,
    fontWeight: '500',
    fontFamily: 'QuantaGroteskProMedium',
  },

  mapContainer: {
    flex: 1,
    gap: 24,
    alignItems: 'stretch',
  },
});
