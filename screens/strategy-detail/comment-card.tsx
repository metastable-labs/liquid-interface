import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { FlashIcon } from '@/assets/icons';
import { adjustFontSizeForIOS, formatTimestamp } from '@/utils/helpers';
import { LQDImage } from '@/components';

const CommentCard = ({ author, content, createdAt, isLiked, likeCount, id }: CommentItem) => {
  return (
    <View style={styles.container}>
      <LQDImage height={30} width={30} />

      <View style={styles.commentLeftWrapper}>
        <View style={styles.usernameFlex}>
          <Text style={styles.username}>Meister</Text>
          <Text style={styles.time}>{formatTimestamp(createdAt)}</Text>
        </View>
        <Text style={styles.comment}>{content}</Text>
      </View>

      <TouchableOpacity style={styles.commentRightWrapper}>
        {isLiked ? <FlashIcon fill="#F2AE40" bg="#F2AE40" /> : <FlashIcon />}

        <Text style={[styles.likeCount, { color: isLiked ? '#F2AE40' : '#1E293B' }]}>{likeCount}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CommentCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
  },
  commentRightWrapper: {
    alignItems: 'center',
    gap: 6,
  },
  commentLeftWrapper: {
    flex: 1,
    marginRight: 10,
    gap: 5,
  },
  commentCardContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  usernameFlex: {
    flexDirection: 'row',
    gap: 7,
  },
  username: {
    fontSize: adjustFontSizeForIOS(13, 3),
    fontFamily: 'ClashDisplayBold',
    fontWeight: '500',
    color: '#1E293B',
  },
  likeCount: {
    fontSize: adjustFontSizeForIOS(11, 3),
    fontFamily: 'AeonikRegular',
    fontWeight: '400',
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
});
