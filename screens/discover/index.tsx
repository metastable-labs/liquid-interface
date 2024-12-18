import { useState } from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import { LQDStrategyCard } from '@/components';
import DefaultFooterLoader from '@/components/flatlist/footer-loader';
import DiscoverFilters from './filters';
import Loader from '../home/loader';
import { useSearchFeeds } from '@/services/discover/queries';

const Discover = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [minTvl, setMinTvl] = useState('');
  const [maxTvl, setMaxTvl] = useState('');
  const [cursor, setCursor] = useState('');
  const [assets, setAssets] = useState<string[]>([]);
  const [protocols, setProtocols] = useState<string[]>([]);

  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, isLoading, refetch } = useSearchFeeds(
    searchQuery,
    cursor,
    minTvl,
    maxTvl,
    assets,
    protocols
  );

  const feeds = data?.pages.flatMap((page) => page.data) || [];

  const loadMoreStrategies = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return (
    <View style={styles.container}>
      <DiscoverFilters
        setSearchQuery={setSearchQuery}
        setMinTvl={setMinTvl}
        setMaxTvl={setMaxTvl}
        setCursor={setCursor}
        setAssets={setAssets}
        setProtocols={setProtocols}
      />

      {isLoading && <Loader />}

      {feeds.length > 0 && !isLoading && (
        <FlatList
          refreshing={isFetching}
          onRefresh={refetch}
          data={feeds}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <LQDStrategyCard {...item} />}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={styles.strategyContainerStyle}
          onEndReached={loadMoreStrategies}
          ListFooterComponent={isFetchingNextPage ? <DefaultFooterLoader /> : null}
        />
      )}

      {!feeds.length && !isLoading && <Text style={styles.noStrategiesText}>No strategies found</Text>}
    </View>
  );
};

export default Discover;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop: 20,
  },
  strategyContainerStyle: {
    gap: 20,
    paddingBottom: 120,
    paddingHorizontal: 12,
    paddingTop: 15,
  },
  noStrategiesText: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    fontFamily: 'AeonikMedium',
    marginTop: 50,
  },
  topGainerLoaderOne: { height: 45, width: 45, borderRadius: 100 },
});
