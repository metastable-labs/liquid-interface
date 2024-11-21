import { useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, ScrollView, TouchableOpacity, Alert, Platform, StatusBar as RNStatusBar } from 'react-native';

import useSystemFunctions from '@/hooks/useSystemFunctions';
import { adjustFontSizeForIOS, formatAmountWithWholeAndDecimal } from '@/utils/helpers';
import { LQDButton, LQDPoolPairCard, LQDPoolPairPaper, LQShrimeLoader, SearchUI } from '@/components';
import { CaretRightIcon, DirectUpIcon, DollarSquareIcon, SearchIcon, SettingsIcon, TrendUpIcon } from '@/assets/icons';
import { useAccountActions } from '@/store/account/actions';
import { usePoolActions } from '@/store/pools/actions';
import { useOnMount } from '@/hooks/useOnMount';
import Section from './section';
import SearchPlaceholder from '@/components/search-ui/search-placeholder';

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
          renderItem={({ item }) => <LQDPoolPairCard loading={globalLoading} pool={item} />}
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
            <LQDPoolPairPaper loading={globalLoading} key={index} pool={pool} />
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
            <LQDPoolPairPaper loading={globalLoading} key={index} pool={pool} />
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

  return (
    <>
      <SearchPlaceholder loading={globalLoading} />

      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.balanceAndActionContainer}>
          {!globalLoading && (
            <View style={styles.balanceContainer}>
              <Text style={styles.balanceTitle}>Total Balance</Text>
              <TouchableOpacity onPress={() => router.push('/(tabs)/holdings')} style={styles.balanceValueContainer}>
                <Text style={styles.balanceWholeValue}>
                  ${whole}.<Text style={styles.balanceDecimalValue}>{decimal}</Text>
                </Text>

                <CaretRightIcon width={20} height={20} fill="#F8FAFC" />
              </TouchableOpacity>
            </View>
          )}
          {globalLoading && <LQShrimeLoader style={styles.loaderBalance} />}

          {!globalLoading && (
            <LQDButton
              title="Add money"
              onPress={() => router.push('/deposit/debit')}
              variant="tertiaryOutline"
              icon="money"
              iconColor="#334155"
              style={{ alignSelf: 'stretch' }}
            />
          )}

          {globalLoading && <LQShrimeLoader style={styles.loaderButton} />}
        </View>

        {sections.map((section, index) => (
          <Section key={index} {...section} loading={globalLoading} />
        ))}
      </ScrollView>
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

  searchWrapper: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 20,
    paddingBottom: Platform.OS === 'android' ? -(RNStatusBar.currentHeight || 0) : -48,
  },

  loaderButton: { height: 40, borderRadius: 16 },
  loaderBalance: { height: 98, borderRadius: 16 },
});
