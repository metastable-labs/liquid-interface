import { useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Platform, StatusBar as RNStatusBar, ScrollView } from 'react-native';

import useSystemFunctions from '@/hooks/useSystemFunctions';
import { adjustFontSizeForIOS, createArrayWithIndexes, formatAmountWithWholeAndDecimal } from '@/utils/helpers';
import { LQDButton, LQDPoolPairCard, LQDPoolPairPaper, LQDScrollView, LQShrimeLoader, SearchUI } from '@/components';
import { CaretRightIcon, DirectUpIcon, DollarSquareIcon, TrendUpIcon } from '@/assets/icons';
import { useAccountActions } from '@/store/account/actions';
import { usePoolActions } from '@/store/pools/actions';
import { useOnMount } from '@/hooks/useOnMount';
import Section from './section';
import SearchPlaceholder from '@/components/search-ui/search-placeholder';
import Loader from './loader';

const Home = () => {
  const { router, poolsState, smartAccountState, accountState, appState } = useSystemFunctions();
  const { getTokens } = useAccountActions();
  const { getPools, getAllPools } = usePoolActions();

  const { trendingPools, hotPools, topGainers, loadingPools } = poolsState;
  const { loading: loadingAccounts } = accountState;

  const { whole, decimal } = formatAmountWithWholeAndDecimal(accountState.tokenBalance.toFixed(2));

  const hotPoolsArray = Object.values(hotPools.data);
  const trendingPoolsArray = Object.values(trendingPools.data);
  const top7GainersArray = Object.values(topGainers.data);

  const top10TrendingPools = trendingPoolsArray?.slice(0, 10);
  const top10HotPools = hotPoolsArray.slice(0, 10) ?? [];
  const top7Gainers = top7GainersArray.slice(0, 7);
  const globalLoading = loadingPools || loadingAccounts;
  const emptyArryTopGainers = createArrayWithIndexes(3);
  const emptyArryTrending = createArrayWithIndexes(5);

  const sections = [
    {
      title: 'Top gainers',
      subtitle: 'by APR',
      icon: <TrendUpIcon />,
      action: () => router.push('/(tabs)/home/top'),
      children: (
        <FlatList
          data={top7Gainers}
          horizontal
          renderItem={({ item }) => <LQDPoolPairCard pool={item} />}
          keyExtractor={(_, index) => index.toString()}
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
          {top10TrendingPools.map((pool, index) => (
            <LQDPoolPairPaper key={index} pool={pool} />
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
          {top10HotPools.map((pool, index) => (
            <LQDPoolPairPaper key={index} pool={pool} />
          ))}
        </View>
      ),
    },
  ];

  useEffect(
    function fetchBalances() {
      getTokens();
      //getPositions();
    },
    [smartAccountState.address]
  );

  useOnMount(function loadData() {
    getPools();
    getAllPools();
  });

  if (appState.showSearch) {
    return (
      <View style={styles.searchWrapper}>
        <SearchUI />
      </View>
    );
  }
  if (globalLoading) return <Loader />;

  return (
    <>
      <SearchPlaceholder />

      <LQDScrollView refreshing={accountState.refreshing} onRefresh={() => getTokens(true)} style={styles.container}>
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
      </LQDScrollView>
    </>
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

  searchWrapper: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 20,
    paddingBottom: Platform.OS === 'android' ? -(RNStatusBar.currentHeight || 0) : -48,
  },
});
