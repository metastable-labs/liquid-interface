import { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

import SearchSection from './sections';
import { recents, explore } from './dummy';
import RecentCard from './recent-card';
import ExploreCard from './explore-card';
import LQDSearch from '../search';
import LQDPoolPairPaper from '../pool-pair-paper';
import useSystemFunctions from '@/hooks/useSystemFunctions';
import { usePoolActions } from '@/store/pools/actions';

const SearchUI = () => {
  const { router, poolsState } = useSystemFunctions();
  const { searchPools } = usePoolActions();

  const [showRecents, setShowRecents] = useState(true);

  const pools = poolsState.trendingPools.data.slice(0, 10);

  const sections: Array<Partial<ISearchSection>> = [
    {
      title: 'Recents',
      children: (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 10 }}>
          {recents.map((recent) => (
            <RecentCard key={recent.id} {...recent} />
          ))}
        </ScrollView>
      ),
      onClear: () => setShowRecents(false),
    },

    {
      title: 'Explore',
      children: (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 10 }}>
          {explore.map((explore) => (
            <ExploreCard key={explore.id} {...explore} />
          ))}
        </ScrollView>
      ),
    },

    {
      title: 'Trending',
      children: (
        <View style={styles.mapContainer}>
          {pools.map((pool, index) => (
            <LQDPoolPairPaper key={index} pool={pool} />
          ))}
        </View>
      ),
    },
  ];

  const searchResultSection = [
    {
      title: 'Results',
      children: (
        <View style={styles.mapContainer}>
          {pools.map((pool, index) => (
            <LQDPoolPairPaper key={index} pool={pool} />
          ))}
        </View>
      ),
    },
  ];

  const sectionsToShow = false ? searchResultSection : showRecents ? sections : sections.slice(1);

  const handleQuery = (value: string) => {
    searchPools(value);
  };

  return (
    <>
      <LQDSearch setQuery={handleQuery} />

      <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {sectionsToShow.map((section, index) => (
          <SearchSection key={section.title} {...(section as ISearchSection)} index={index} />
        ))}
      </ScrollView>
    </>
  );
};

export default SearchUI;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    paddingHorizontal: 16,
  },

  content: {
    paddingTop: 34,
    paddingBottom: 68,
    gap: 40,
  },

  mapContainer: {
    gap: 24,
    alignItems: 'stretch',
  },
});
