import { StyleSheet, View, FlatList } from 'react-native';
import { LQDStrategyCard } from '@/components';
import { useFeeds } from '@/services/feeds/queries';
import DefaultFooterLoader from '@/components/flatlist/footer-loader';
import DiscoverFilters from './filters';
import Loader from '../home/loader';

const Discover = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isFetching, isError, error, refetch } = useFeeds();

  const strategies = data?.pages.flatMap((page) => page.data) || [];

  const loadMoreStrategies = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <View style={styles.container}>
      <DiscoverFilters />

      <FlatList
        refreshing={data && isFetching}
        onRefresh={refetch}
        data={strategies}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <LQDStrategyCard {...item} />}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={styles.strategyContainerStyle}
        onEndReached={loadMoreStrategies}
        ListFooterComponent={isFetchingNextPage ? <DefaultFooterLoader /> : null}
      />
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
});
