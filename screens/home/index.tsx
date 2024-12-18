import { StyleSheet, Platform, StatusBar as RNStatusBar, Pressable, FlatList } from 'react-native';

import useSystemFunctions from '@/hooks/useSystemFunctions';
import { adjustFontSizeForIOS } from '@/utils/helpers';
import { LQDFeedCard } from '@/components';
import { PlusIcon } from '@/assets/icons';
import Loader from './loader';
import { useFeeds } from '@/services/feeds/queries';
import DefaultFooterLoader from '@/components/flatlist/footer-loader';

const Home = () => {
  const { router } = useSystemFunctions();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isFetching, isError, error, refetch } = useFeeds();

  const feeds = data?.pages.flatMap((page) => page.data) || [];

  const loadMoreFeeds = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Pressable onPress={() => router.navigate('/(strategy)/create-strategy')} style={styles.addIcon}>
        <PlusIcon />
      </Pressable>

      <FlatList
        refreshing={isFetching}
        data={feeds}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <LQDFeedCard feed={item} />}
        keyExtractor={(_, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        style={{ backgroundColor: '#fff' }}
        onRefresh={refetch}
        onEndReached={loadMoreFeeds}
        ListFooterComponent={isFetchingNextPage ? <DefaultFooterLoader /> : null}
      />
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    paddingTop: 34,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },

  contentContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingBottom: 150,
  },

  listContainer: {
    backgroundColor: '#fff',
    paddingBottom: 100,
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

  searchWrapper: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 20,
    paddingBottom: Platform.OS === 'android' ? -(RNStatusBar.currentHeight || 0) : -48,
  },
  addIcon: {
    backgroundColor: '#4691FE',
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    position: 'absolute',
    bottom: '12%',
    right: 15,
    zIndex: 2,
  },
});
