import { useState } from 'react';
import { StyleSheet, View, Text, FlatList, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { LQDPressAnimation } from '@/components';
import Section from './section';
import Gainers from './gainers';
import PoolPair from './pool-pair';
import { topGainers, poolPairs } from './dummy';

type Section = 'topGainers' | 'trending' | 'hot' | null;

const Home = () => {
  const balance = 36_708.89;
  const [activeSection, setActiveSection] = useState<Section>(null);

  const handleSeeAll = (section: Section) => setActiveSection(section);

  const sections = [
    {
      title: 'Top gainers',
      subtitle: 'by APR',
      icon: <Ionicons name="trending-up" size={18} color="#0C0507" />,
      action: () => handleSeeAll('topGainers'),
      isShowingAll: activeSection === 'topGainers',
      children: (
        <FlatList
          data={topGainers}
          horizontal
          renderItem={({ item }) => <Gainers {...item} />}
          keyExtractor={(item, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 10 }}
        />
      ),
      show: activeSection === 'topGainers' || activeSection === null,
    },

    {
      title: 'Trending',
      subtitle: 'by Volume',
      icon: <Ionicons name="arrow-up" size={18} color="#0C0507" />,
      action: () => handleSeeAll('trending'),
      isShowingAll: activeSection === 'trending',
      children: poolPairs.map((poolPair, index) => (
        <PoolPair key={index} {...poolPair} />
      )),
      show: activeSection === 'trending' || activeSection === null,
    },

    {
      title: 'Hot',
      subtitle: 'by TVL',
      icon: <Ionicons name="flame" size={18} color="#0C0507" />,
      action: () => handleSeeAll('hot'),
      isShowingAll: activeSection === 'hot',
      children: poolPairs.map((poolPair, index) => (
        <PoolPair key={index} {...poolPair} capitalMetric="tvl" />
      )),
      show: activeSection === 'hot' || activeSection === null,
    },
  ];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[
        styles.contentContainer,
        Boolean(activeSection) && { gap: 36 },
      ]}
      showsVerticalScrollIndicator={false}
    >
      {!activeSection ? (
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceTitle}>Total Balance</Text>

          <View style={styles.balanceValueContainer}>
            <Text style={styles.balanceValue}>${balance.toLocaleString()}</Text>
            <LQDPressAnimation>
              <Ionicons name="chevron-forward" size={24} color="#F8FAFC" />
            </LQDPressAnimation>
          </View>
        </View>
      ) : (
        <LQDPressAnimation
          onPress={() => setActiveSection(null)}
          style={styles.backContainer}
        >
          <Ionicons name="chevron-back" size={16} color="#1E293B" />
          <Text style={styles.backText}>Back</Text>
        </LQDPressAnimation>
      )}

      {sections.map(
        (section, index) => section.show && <Section key={index} {...section} />
      )}
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
    gap: 46,
  },

  balanceContainer: {
    alignSelf: 'stretch',
    gap: 12,
    padding: 16,
    backgroundColor: '#3F4C00',
    borderRadius: 16,
    shadowColor: 'rgba(2, 6, 23, 0.06)',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 3,
  },

  balanceTitle: {
    color: '#F8FAFC',
    fontSize: 13,
    lineHeight: 16.12,
  },

  balanceValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },

  balanceValue: {
    color: '#FFF',
    fontSize: 36,
    lineHeight: 40.32,
    fontWeight: '700',
    fontFamily: 'ClashDisplayBold',
  },

  backContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    alignSelf: 'flex-start',
  },

  backText: {
    color: '#1E293B',
    fontSize: 14,
    lineHeight: 17.64,
    fontWeight: '500',
  },
});
