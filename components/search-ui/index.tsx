import { useState } from 'react';
import { View, StyleSheet, ScrollView, FlatList } from 'react-native';

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
  const { searchPools, getPaginatedSearchPools } = usePoolActions();
  const [searchText, setSearchText] = useState('');

  const [showRecents, setShowRecents] = useState(true);

  const trendingPools = poolsState.trendingPools.data.slice(0, 10);
  const searchedPools = poolsState.searchedPools.data;

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
      title: 'Trending Pools',
      children: (
        <View style={styles.mapContainer}>
          {trendingPools.map((pool, index) => (
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
          <FlatList
            data={searchedPools}
            renderItem={({ item }) => <LQDPoolPairPaper pool={item} />}
            keyExtractor={(_, index) => index.toString()}
            contentContainerStyle={{ gap: 24 }}
            onEndReached={() => getPaginatedSearchPools(searchText)}
            onEndReachedThreshold={0.1}
            bounces={true}
            showsVerticalScrollIndicator={false}
          />
        </View>
      ),
    },
  ];

  const sectionsToShow = searchedPools.length > 0 ? searchResultSection : showRecents ? sections : sections.slice(1);

  const handleQuery = (value: string) => {
    searchPools(value);
    setSearchText(value);
  };

  return (
    <>
      <LQDSearch setQuery={handleQuery} />

      {searchedPools.length == 0 && (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
          {sectionsToShow.map((section, index) => (
            <SearchSection key={section.title} {...(section as ISearchSection)} index={index} />
          ))}
        </ScrollView>
      )}

      {searchedPools.length > 0 && (
        <View style={styles.container}>
          {sectionsToShow.map((section, index) => (
            <SearchSection key={section.title} {...(section as ISearchSection)} index={index} />
          ))}
        </View>
      )}
    </>
  );
};

export default SearchUI;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 34,
    paddingBottom: 68,
    gap: 40,
  },

  mapContainer: {
    gap: 24,
    alignItems: 'stretch',
  },
});
