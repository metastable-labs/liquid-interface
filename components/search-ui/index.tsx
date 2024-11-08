import { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

import SearchSection from './sections';
import { recents, explore } from './dummy';
import RecentCard from './recent-card';
import ExploreCard from './explore-card';
import { LQDPoolPairPaper, LQDSearch } from '@/components';
import useSystemFunctions from '@/hooks/useSystemFunctions';

const SearchUI = () => {
  const { router, poolsState } = useSystemFunctions();

  const [showRecents, setShowRecents] = useState(true);
  const [query, setQuery] = useState('');

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

  const sectionsToShow = query ? searchResultSection : showRecents ? sections : sections.slice(1);

  return (
    <>
      <LQDSearch setQuery={setQuery} />

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
