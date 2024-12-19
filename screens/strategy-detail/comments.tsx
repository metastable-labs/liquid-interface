import { FlatList, StyleSheet, Text, View } from 'react-native';
import { LQDBottomSheet, LQShrimeLoader } from '@/components';
import CommentCard from './comment-card';
import { adjustFontSizeForIOS } from '@/utils/helpers';
import { useComments } from '@/services/comments/queries';
import DefaultFooterLoader from '@/components/flatlist/footer-loader';
import CommentInput from './comment-input';
import Loader from '../home/loader';

const EmptyState = () => (
  <View style={styles.emptyStateWrapper}>
    <Text style={styles.emptyText}>No comments</Text>
    <LQShrimeLoader style={styles.lineOne} />
    <LQShrimeLoader style={styles.lineTwo} />
    <LQShrimeLoader style={styles.lineThree} />
  </View>
);

const Comments = ({
  openCloseComment,
  showCommentSection,
  strategyId,
}: {
  openCloseComment: () => void;
  showCommentSection: boolean;
  strategyId: string;
}) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isFetching, isError, error, refetch } = useComments(strategyId);

  const comments = data?.pages.flatMap((page) => page.data) || [];

  const loadMoreComments = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <View style={{ flex: 1 }}>
      <LQDBottomSheet show={showCommentSection} title="Comments" variant="primary" onClose={openCloseComment}>
        <View>
          <View style={styles.flatlistWrapper}>
            {comments.length > 0 ? (
              <FlatList
                refreshing={isFetching}
                data={comments}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => <CommentCard {...item} />}
                keyExtractor={(_, index) => index.toString()}
                onRefresh={refetch}
                onEndReached={loadMoreComments}
                ListFooterComponent={isFetchingNextPage ? <DefaultFooterLoader /> : null}
                contentContainerStyle={styles.commentContainerStyle}
              />
            ) : (
              <EmptyState />
            )}
          </View>

          <CommentInput strategyId={strategyId} />
        </View>
      </LQDBottomSheet>
    </View>
  );
};

export default Comments;

const styles = StyleSheet.create({
  lineOne: {
    height: 8,
    borderRadius: 10,
    marginTop: 10,
    width: '80%',
  },
  lineTwo: {
    height: 8,
    borderRadius: 10,
    marginTop: 10,
    width: '60%',
  },
  lineThree: {
    height: 8,
    borderRadius: 10,
    marginTop: 10,
    width: '40%',
  },
  emptyStateWrapper: {
    alignItems: 'center',
    marginTop: 30,
  },
  commentContainer: {
    bottom: 10,
    left: 0,
    right: 0,
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,

    borderTopColor: '#EAEEF4',
    zIndex: 10,
  },
  commentContainerStyle: {
    gap: 24,
    paddingBottom: 50,
  },

  emptyText: {
    fontSize: adjustFontSizeForIOS(16, 1),
    fontFamily: 'AeonikBold',
    fontWeight: '500',
    color: '#1E293B',
    lineHeight: 19.2,
    marginBottom: 5,
  },

  flatlistWrapper: {
    flex: 1,
    height: 320,
    maxHeight: 450,
  },
});
