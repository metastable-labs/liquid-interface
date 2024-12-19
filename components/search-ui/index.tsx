import { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, FlatList, Text, Pressable } from 'react-native';

import SearchSection from './sections';
import RecentCard from './popular-asset-card';
import LQDSearch from '../search';
import LQDPoolPairPaper from '../pool-pair-paper';
import useSystemFunctions from '@/hooks/useSystemFunctions';
import { usePoolActions } from '@/store/pools/actions';
import { SearchEmptyStateIcon } from '@/assets/icons';
import { ISearchSection } from './types';
import LQShrimeLoader from '../loader';
import { createArrayWithIndexes } from '@/utils/helpers';
import { clearRecentSearchedPools } from '@/store/pools';
import LQNoResult from '../no-result';
import Modal from 'react-native-modal';

const SearchUI = () => {
  const { router, poolsState, dispatch } = useSystemFunctions();
  const { searchPools, getPaginatedSearchPools } = usePoolActions();
  const [searchText, setSearchText] = useState('');

  const trendingPools = poolsState.trendingPools.data.slice(0, 10);
  const searchedPools = poolsState.searchedPools.data;
  const loading = poolsState.searchingPools;
  const recentSearch = poolsState.recentSearchedPools;

  const [showRecents, setShowRecents] = useState(true);
  const [selectedAsset, setSelectedAsset] = useState(null);

  const emptysearch = createArrayWithIndexes(10);

  useEffect(() => {
    if (poolsState.recentSearchedPools.length > 0) {
      setShowRecents(true);
    } else {
      setShowRecents(false);
    }
  }, [poolsState.recentSearchedPools]);

  const sections: Array<Partial<ISearchSection>> = [
    {
      title: 'Popular',
      children: (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 10 }}>
          {recentSearch.map((recent, index) => {
            return <RecentCard key={index} pool={recent} />;
          })}
        </ScrollView>
      ),
      onClear: () => dispatch(clearRecentSearchedPools()),
    },
    {
      title: 'All assets',
      children: (
        <View style={styles.mapContainer}>
          {trendingPools.map((pool, index) => (
            <LQDPoolPairPaper selected={selectedAsset === pool.address} key={index} pool={pool} />
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
            renderItem={({ item }) => {
              console.log(item.address);
              return <LQDPoolPairPaper selected={selectedAsset === item.address} pool={item} />;
            }}
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

  const Loader = () =>
    emptysearch.map((_, index) => (
      <View key={index} style={styles.loaderContainer}>
        <LQShrimeLoader style={styles.loaderOne} />
        <View style={styles.loaderCenterContainer}>
          <LQShrimeLoader style={styles.loaderTwo} />
          <LQShrimeLoader style={styles.loaderThree} />
        </View>
        <LQShrimeLoader style={styles.loaderFour} />
      </View>
    ));

  return (
    <Modal style={{ padding: 0, margin: 0 }} statusBarTranslucent isVisible={true} animationIn="slideInUp" animationOut="slideOutDown">
      <Pressable style={styles.overlay} />
      <View
        style={{
          ...styles.bottomSheet,
        }}
      >
        <View style={{ paddingHorizontal: 16 }}>
          <LQDSearch setQuery={handleQuery} />
        </View>

        {loading && <Loader />}

        {searchedPools.length === 0 && searchText && !loading && (
          <LQNoResult
            title="Can’t find this pool"
            description="We can’t find that pool, make sure it’s not a typo or you can explore other pools on Liquid"
          />
        )}

        {searchedPools.length === 0 && !searchText && !loading && (
          <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {sectionsToShow.map((section, index) => (
              <SearchSection key={section.title} {...(section as ISearchSection)} index={index} />
            ))}
          </ScrollView>
        )}

        {searchedPools.length > 0 && !loading && (
          <View style={styles.container}>
            {sectionsToShow.map((section, index) => (
              <SearchSection key={section.title} {...(section as ISearchSection)} index={index} />
            ))}
          </View>
        )}
      </View>
    </Modal>
  );
};

export default SearchUI;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 68,
  },

  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    width: '100%',
  },

  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    zIndex: 30,
    width: '100%',
    paddingBottom: 10,
    paddingTop: 17,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    gap: 33,
    maxHeight: '90%',
    height: '90%',
  },

  mapContainer: {
    gap: 24,
    alignItems: 'stretch',
  },

  loaderContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 15,
    paddingHorizontal: 16,
    gap: 10,
  },

  loaderCenterContainer: { flex: 1, gap: 5 },

  loaderOne: { height: 45, width: 45, borderRadius: 100 },
  loaderTwo: { height: 20, width: '40%', borderRadius: 6 },
  loaderThree: { height: 20, width: '50%', borderRadius: 6 },
  loaderFour: { height: 20, width: 56, borderRadius: 6 },
});
