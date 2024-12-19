import { FlatList } from 'react-native';
import { useUserLikes } from '@/services/user/queries';
import { LQDFeedCard } from '@/components';
import DefaultFooterLoader from '@/components/flatlist/footer-loader';
import Loader from '../home/loader';

const UserLikedStrategies = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isFetching, isError, error, refetch } = useUserLikes(
    '0x1234567890123456789012345678901234567890'
  );

  const feeds = data?.pages.flatMap((page) => page.data) || [];

  const loadMoreStrategies = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <FlatList
      refreshing={isFetching}
      data={feeds}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => <LQDFeedCard feed={item} />}
      keyExtractor={(_, index) => index.toString()}
      showsHorizontalScrollIndicator={false}
      style={{ backgroundColor: '#fff' }}
      onRefresh={refetch}
      onEndReached={loadMoreStrategies}
      ListFooterComponent={isFetchingNextPage ? <DefaultFooterLoader /> : null}
    />
  );
};

export default UserLikedStrategies;
