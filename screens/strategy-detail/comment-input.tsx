import { useRef, useState } from 'react';
import { FlatList, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { LQDImage } from '@/components';
import { ArrowUpCircleIcon, SmileEmojiIcon } from '@/assets/icons';
import { useAddCommentMutation } from '@/services/comments/queries';

const CommentInput = ({ strategyId }: { strategyId: string }) => {
  const flatListRef = useRef<FlatList>(null);
  const [comment, setComment] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [dynamicHeight, setDynamicHeight] = useState(0);

  const inputheight = Math.min(Math.max(44, dynamicHeight), 80);

  const addCommentMutation = useAddCommentMutation(strategyId);

  const handleAddComment = () => {
    if (comment.trim()) {
      addCommentMutation.mutate(
        { content: comment.trim() },
        {
          onSuccess: () => {
            setComment('');
            flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
          },
        }
      );
    }
  };

  return (
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
          <TouchableOpacity onPress={handleAddComment}>
            <ArrowUpCircleIcon height={25} width={25} />
          </TouchableOpacity>
        ) : (
          <SmileEmojiIcon height={25} width={25} />
        )}
      </View>
    </View>
  );
};

export default CommentInput;

const styles = StyleSheet.create({
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

  textInput: {
    flex: 1,
  },

  focusedInput: {
    borderColor: '#4691FE',
    borderWidth: 1.2,
  },
});
