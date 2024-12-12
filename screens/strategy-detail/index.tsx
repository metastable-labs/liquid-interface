import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useRef, useState } from 'react';
import { LQDBottomSheet, LQDButton, LQDFeedCard, LQDFlatlist, LQDImage, LQDInput, LQDScrollView, LQShrimeLoader } from '@/components';
import { feeds, strategyInfo } from '../home/dummy';
import { ArrowUpCircleIcon, DiscoverUSDIcon, FlashIcon, SmileEmojiIcon, CuratorIcon } from '@/assets/icons';
import { adjustFontSizeForIOS } from '@/utils/helpers';
import StatsCard from './stats-card';
import CommentCard from './comment-card';

const StrategyDetail = ({ strategyId }: any) => {
  const flatListRef = useRef<FlatList>(null);

  const [comment, setComment] = useState('');
  const [showComment, setShowComment] = useState(false);
  const [dynamicHeight, setDynamicHeight] = useState(0);
  const [comments, setComments] = useState<ICommentCard['comment'][]>([]);

  const inputheight = Math.min(Math.max(44, dynamicHeight), 80);

  const handleComment = () => {
    const payload = {
      content: comment,
      date: '2h',
      likes: 34,
      username: '@Njoku',
      image: '',
    };
    if (comment.trim().length > 0) {
      setComments((prev: any) => [...prev, payload]);
      setComment('');
    }

    flatListRef.current?.scrollToEnd({ animated: true });
  };

  const openComment = () => {
    setShowComment((prev) => !prev);
  };

  const EmptyState = () => (
    <View style={styles.emptyStateWrapper}>
      <Text style={styles.emptyText}>No comments</Text>
      <LQShrimeLoader style={styles.lineOne} />
      <LQShrimeLoader style={styles.lineTwo} />
      <LQShrimeLoader style={styles.lineThree} />
    </View>
  );

  const bottomInput = () => (
    <View style={styles.commentContainer}>
      <LQDImage />
      <View style={[styles.commentInput, { height: inputheight }]}>
        <TextInput
          placeholder="Write a comment"
          value={comment}
          onChangeText={(val) => setComment(val)}
          multiline={true}
          onContentSizeChange={(event) => setDynamicHeight(event.nativeEvent.contentSize.height)}
          style={{ flex: 1 }}
          autoFocus
        />
        {comment.length > 0 ? (
          <TouchableOpacity onPress={handleComment}>
            <ArrowUpCircleIcon />
          </TouchableOpacity>
        ) : (
          <SmileEmojiIcon />
        )}
      </View>
    </View>
  );

  return (
    <LQDScrollView refreshing={false} onRefresh={() => {}} style={styles.container}>
      <LQDFeedCard showComment={openComment} feed={feeds[0]} />

      <View style={styles.infoContainer}>
        <Text style={styles.sectionTitle}>Strategy Info</Text>

        <View style={styles.statsWrapper}>
          {strategyInfo.map((stats, index) => (
            <StatsCard key={index} isActive={stats.active} variant={stats.variant} title={stats.title} value={stats.value} />
          ))}
        </View>

        <View style={styles.tokenContainer}>
          <View style={styles.tokenWrapper}>
            <DiscoverUSDIcon />
            <Text style={styles.token}>USDC</Text>
          </View>
          <View style={styles.tokenWrapper}>
            <Text style={styles.invested}>Invested:</Text>
            <Text style={styles.investedAmount}>3,000</Text>
          </View>
        </View>

        <View style={styles.buttonWrapper}>
          <LQDButton title="Withdraw" variant="primary" />
        </View>
      </View>

      <View style={{ flex: 1 }}>
        <LQDBottomSheet show={showComment} title="Comments" variant="primary" onClose={openComment}>
          <View>
            <View style={styles.flatlistWrapper}>
              {!comments.length && <EmptyState />}
              {comments.length > 0 && (
                <LQDFlatlist
                  ref={flatListRef}
                  data={comments}
                  showsVerticalScrollIndicator={false}
                  renderItem={({ item }) => <CommentCard comment={item} />}
                  keyExtractor={(_, index) => index.toString()}
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.commentContainerStyle}
                />
              )}
            </View>
            {bottomInput()}
          </View>
        </LQDBottomSheet>
      </View>
    </LQDScrollView>
  );
};

export default StrategyDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  statsWrapper: { flexDirection: 'row', width: '100%', flexWrap: 'wrap', gap: 20 },
  commentRightWrapper: { alignItems: 'center', gap: 6 },
  commentLeftWrapper: { flex: 1, marginRight: 10, gap: 5 },
  commentCardContainer: { flexDirection: 'row', gap: 8 },
  lineOne: { height: 8, borderRadius: 10, marginTop: 10, width: '80%' },
  lineTwo: { height: 8, borderRadius: 10, marginTop: 10, width: '60%' },
  lineThree: { height: 8, borderRadius: 10, marginTop: 10, width: '40%' },
  emptyStateWrapper: { alignItems: 'center', marginTop: 30 },
  commentContainer: {
    bottom: 30,
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
    gap: 20,
    paddingBottom: 50,
  },

  commentInput: {
    borderWidth: 1,
    borderColor: '#EAEEF4',
    height: 44,
    borderRadius: 16,
    alignItems: 'center',
    paddingHorizontal: 10,
    flex: 1,
    flexDirection: 'row',
    gap: 5,
  },
  infoContainer: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  emptyText: {
    fontSize: adjustFontSizeForIOS(16, 1),
    fontFamily: 'AeonikBold',
    fontWeight: '500',
    color: '#1E293B',
    lineHeight: 19.2,
    marginBottom: 5,
  },

  title: {
    fontSize: adjustFontSizeForIOS(15, 3),
    fontFamily: 'AeonikBold',
    fontWeight: '500',
    color: '#1E293B',
  },

  address: {
    color: '#64748B',
    fontSize: adjustFontSizeForIOS(11, 3),
    fontFamily: 'AeonikRegular',
    fontWeight: '400',
    lineHeight: 16.8,
  },
  comment: {
    color: '#64748B',
    fontSize: adjustFontSizeForIOS(11, 3),
    fontFamily: 'AeonikRegular',
    fontWeight: '400',
    lineHeight: 16.8,
  },
  time: {
    color: '#64748B',
    fontSize: adjustFontSizeForIOS(11, 3),
    fontFamily: 'AeonikRegular',
    fontWeight: '400',
    lineHeight: 15.84,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 12,
  },
  token: {
    fontSize: adjustFontSizeForIOS(14, 2),
    fontWeight: '500',
    color: '#1A2001',
    lineHeight: 18.48,
    fontFamily: 'AeonikMedium',
  },
  invested: {
    fontSize: adjustFontSizeForIOS(14, 2),
    fontWeight: '500',
    color: '#64748B',
    lineHeight: 18.48,
    fontFamily: 'AeonikMedium',
  },
  investedAmount: {
    fontSize: adjustFontSizeForIOS(16, 2),
    fontWeight: '500',
    color: '#1A2001',
    lineHeight: 19.84,
    fontFamily: 'AeonikMedium',
  },
  tokenContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 5,
  },
  tokenWrapper: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  buttonWrapper: {
    marginTop: 20,
  },
  flatlistWrapper: { flex: 1, height: 400, maxHeight: 450 },
});
