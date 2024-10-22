import { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

import SearchSection from './section';
import { recents, explore } from './dummy';
import RecentCard from './recent-card';
import ExploreCard from './explore-card';
import { LQDPoolPairPaper } from '@/components';
import { poolPairs } from '../home/dummy';

const Search = () => {
  const [showRecents, setShowRecents] = useState(true);
  const [query, setQuery] = useState<SectionQuery>('vol');

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
      query,
      setQuery,
      children: (
        <View style={styles.mapContainer}>
          {poolPairs.map((poolPair, index) => (
            <LQDPoolPairPaper key={index} {...poolPair} capitalMetric={query} />
          ))}
        </View>
      ),
    },
  ];

  const sectionsToShow = showRecents ? sections : sections.slice(1);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      {sectionsToShow.map((section, index) => (
        <SearchSection key={section.title} {...(section as ISearchSection)} index={index} />
      ))}
    </ScrollView>
  );
};

export default Search;

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
