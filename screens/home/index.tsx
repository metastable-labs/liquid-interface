import { StyleSheet, View, Text, FlatList, ScrollView, TouchableOpacity } from 'react-native';

import useSystemFunctions from '@/hooks/useSystemFunctions';
import { adjustFontSizeForIOS, formatAmountWithWholeAndDecimal } from '@/utils/helpers';
import { LQDButton, LQDPoolPairCard, LQDPoolPairPaper } from '@/components';
import { CaretRightIcon, DirectUpIcon, DollarSquareIcon, TrendUpIcon } from '@/assets/icons';
import { topGainers, poolPairs } from './dummy';
import Section from './section';

const balance = 36_708.89;

const Home = () => {
  const { router } = useSystemFunctions();

  const { whole, decimal } = formatAmountWithWholeAndDecimal(balance);

  const sections = [
    {
      title: 'Top gainers',
      subtitle: 'by APR',
      icon: <TrendUpIcon />,
      action: () => router.push('/(tabs)/home/top'),
      children: (
        <FlatList
          data={topGainers}
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
          {poolPairs.map((poolPair, index) => (
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
          {poolPairs.map((poolPair, index) => (
            <LQDPoolPairPaper key={index} {...poolPair} capitalMetric="tvl" />
          ))}
        </View>
      ),
    },
  ];

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
