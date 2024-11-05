import { useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, ScrollView, TouchableOpacity, Alert } from 'react-native';

import useSystemFunctions from '@/hooks/useSystemFunctions';
import { adjustFontSizeForIOS, formatAmountWithWholeAndDecimal } from '@/utils/helpers';
import { LQDButton, LQDPoolPairCard, LQDPoolPairPaper } from '@/components';
import { CaretRightIcon, DirectUpIcon, DollarSquareIcon, TrendUpIcon } from '@/assets/icons';
import { useAccountActions } from '@/store/account/actions';
import Section from './section';
import { clearPersistedSmartAccountInfo } from '@/store/smartAccount/persist';
import { useAuth } from '@/providers';
import { useSmartAccountActions } from '@/store/smartAccount/actions';

const Home = () => {
  const { router, poolsState, smartAccountState, accountState, dispatch } = useSystemFunctions();
  const { getTokens, getPositions } = useAccountActions();
  const { logout } = useSmartAccountActions();

  const { trendingPools, hotPools, topGainers } = poolsState;

  const { whole, decimal } = formatAmountWithWholeAndDecimal(accountState.tokenBalance.toFixed(2));

  const top10TrendingPools = trendingPools.data.slice(0, 10);

  const top10HotPools = hotPools.data.slice(0, 10);

  const top7Gainers = topGainers.data.slice(0, 7);

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

  const handleSignOut = () => {
    Alert.alert('Sign out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign out',
        style: 'destructive',
        onPress: logout,
      },
    ]);
  };

  const { session } = useAuth();

  const handleSmartAccountSign = async () => {
    if (!session) {
      throw new Error('No smart account found');
    }

    try {
      const messageToSign = {
        message: 'Hello, world!',
        timestamp: Date.now(),
      };

      const signature = await session.signMessage({ message: JSON.stringify(messageToSign) });

      console.log('Signature successful:', signature);

      Alert.alert('Signing Successful', 'Signature: ' + signature);
    } catch (error: any) {
      console.log('Error signing message:', error);
      console.log('Error cause:', error.cause);

      Alert.alert('Signing Failed', error.message + '\n' + error.cause);
    }
  };

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

        <LQDButton title="Sign message" onPress={handleSmartAccountSign} variant="tertiaryOutline" />
        <LQDButton title="Sign out" onPress={handleSignOut} variant="tertiaryOutline" />
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
