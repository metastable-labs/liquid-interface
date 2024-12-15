import { useRef, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { LQDBottomSheet, LQDFlatlist, LQDImage, LQShrimeLoader } from '@/components';
import CommentCard from './comment-card';
import { adjustFontSizeForIOS } from '@/utils/helpers';
import { ArrowUpCircleIcon, SmileEmojiIcon } from '@/assets/icons';

const EmptyState = () => (
  <View style={styles.emptyStateWrapper}>
    <Text style={styles.emptyText}>No comments</Text>
    <LQShrimeLoader style={styles.lineOne} />
    <LQShrimeLoader style={styles.lineTwo} />
    <LQShrimeLoader style={styles.lineThree} />
  </View>
);

const Comments = ({ openCloseComment, showCommentSection }: { openCloseComment: () => void; showCommentSection: boolean }) => {
  const flatListRef = useRef<FlatList>(null);
  const [comments, setComments] = useState<ICommentCard['comment'][]>([]);
  const [comment, setComment] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [dynamicHeight, setDynamicHeight] = useState(0);

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

  const bottomInput = () => (
    <View style={styles.commentContainer}>
      <LQDImage />
      <View style={[styles.commentInput, isInputFocused && styles.focusedInput, { height: inputheight }]}>
        <TextInput
          placeholder="Write a comment"
          value={comment}
          onChangeText={(val) => setComment(val)}
          multiline={true}
          onContentSizeChange={(event) => setDynamicHeight(event.nativeEvent.contentSize.height)}
          style={styles.textInput}
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
        />
        {comment.length > 0 ? (
          <TouchableOpacity onPress={handleComment}>
            <ArrowUpCircleIcon height={25} width={25} />
          </TouchableOpacity>
        ) : (
          <SmileEmojiIcon height={25} width={25} />
        )}
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <LQDBottomSheet show={showCommentSection} title="Comments" variant="primary" onClose={openCloseComment}>
        <View>
          <View style={styles.flatlistWrapper}>
            {!comments.length && <EmptyState />}
            {comments.length > 0 && (
              <LQDFlatlist
                ref={flatListRef}
                data={comments}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }: any) => <CommentCard comment={item} />}
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
    gap: 20,
    paddingBottom: 50,
  },

  commentInput: {
    borderWidth: 1,
    borderColor: '#EAEEF4',
    height: 44,
    borderRadius: 16,
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 6,
    flex: 1,
    flexDirection: 'row',
    gap: 3,
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

  textInput: {
    flex: 1,
  },

  focusedInput: {
    borderColor: '#4691FE',
    borderWidth: 1.2,
  },
});
