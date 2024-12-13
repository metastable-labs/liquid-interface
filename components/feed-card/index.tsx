import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import FastImage from 'react-native-fast-image';
import { CommentIcon, FlashIcon, MoreIcon, ReTweetIcon, ShareIcon, SwatchIcon } from '@/assets/icons';
import { adjustFontSizeForIOS } from '@/utils/helpers';
import FeedStep from './feed-step';
import useSystemFunctions from '@/hooks/useSystemFunctions';

const LQDFeedCard = ({ feed, onPressInvest, onPressComment, onPressShare, onPressLike, onNavigate }: FeedCard) => {
  const { router } = useSystemFunctions();
  const { steps, photo, username, address, date, percentage, estimate, title, description, commentCount, shareCount, flashCount } = feed;
  const StrLength = 40;

  const [isExpanded, setIsExpanded] = useState(false);

  const truncatedDescription = description.substring(0, StrLength);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Pressable style={styles.container} onPress={onNavigate}>
      <View>
        <View style={{ flexDirection: 'row', gap: 5 }}>
          <FastImage
            style={styles.image}
            source={{
              uri: photo,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.contain}
          />

          <View style={{ flex: 1 }}>
            <View style={styles.rightContentFlex}>
              <View>
                <View style={styles.usernameFlex}>
                  <Text style={styles.username}>{username}</Text>
                  <Text style={styles.time}>{date}</Text>
                </View>
                <Text style={styles.address} numberOfLines={1}>
                  {address}
                </Text>
              </View>
              <MoreIcon />
            </View>
          </View>
        </View>

        <View style={styles.feedStep}>
          {steps.map((step: IFeedStep, index: number) => (
            <FeedStep key={index} {...step} isLast={step.isLast} />
          ))}
        </View>

        <View style={{ marginVertical: 20, gap: 15 }}>
          <Text style={styles.title}>{title}</Text>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <Text style={styles.estimate}>{estimate}</Text>
            <Text style={styles.percentage}>{percentage}%</Text>
          </View>
          <Text style={styles.description}>{isExpanded ? description : truncatedDescription}</Text>

          {description.length > StrLength && !isExpanded && (
            <Pressable onPress={handleToggle}>
              <Text style={styles.seeMore}>See more...</Text>
            </Pressable>
          )}
          {isExpanded && (
            <Pressable onPress={handleToggle}>
              <Text style={styles.seeMore}>See less...</Text>
            </Pressable>
          )}
        </View>

        <View style={styles.bottomActionContainer}>
          <View style={styles.bottomActionInnerContainer}>
            {onPressInvest && (
              <Pressable style={styles.investBtn} onPress={onPressInvest}>
                <Text style={styles.invest}>Invest</Text>
              </Pressable>
            )}

            <Pressable onPress={onPressComment} style={styles.actionFlex}>
              <CommentIcon />
              <Text style={styles.actionText}>{commentCount}</Text>
            </Pressable>
            <Pressable onPress={onPressShare} style={styles.actionFlex}>
              <ReTweetIcon />
              <Text style={styles.actionText}>{shareCount}</Text>
            </Pressable>
            <Pressable onPress={onPressLike} style={styles.actionFlex}>
              <FlashIcon />
              <Text style={styles.actionText}>{flashCount}</Text>
            </Pressable>
          </View>
          <Pressable>
            <ShareIcon />
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
};

export default LQDFeedCard;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 25,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#F1F5F9',
    gap: 20,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  username: {
    fontSize: adjustFontSizeForIOS(13, 3),
    fontFamily: 'ClashDisplayBold',
    fontWeight: '500',
    color: '#1E293B',
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
  time: {
    color: '#64748B',
    fontSize: adjustFontSizeForIOS(12, 3),
    fontFamily: 'AeonikRegular',
    fontWeight: '400',
    lineHeight: 15.84,
  },
  estimate: {
    color: '#64748B',
    fontSize: adjustFontSizeForIOS(12, 2),
    fontFamily: 'AeonikRegular',
    fontWeight: '500',
    lineHeight: 15.84,
  },
  actionText: {
    color: '#64748B',
    fontSize: adjustFontSizeForIOS(12, 2),
    fontFamily: 'AeonikRegular',
    fontWeight: '500',
    lineHeight: 15.84,
  },
  percentage: {
    color: '#4691FE',
    fontSize: adjustFontSizeForIOS(14, 3),
    fontFamily: 'AeonikRegular',
    fontWeight: '500',
    lineHeight: 15.84,
  },
  description: {
    color: '#64748B',
    fontSize: adjustFontSizeForIOS(14, 2),
    fontFamily: 'AeonikRegular',
    fontWeight: '400',
    lineHeight: 19,
  },
  seeMore: {
    color: '#375DFB',
    fontSize: adjustFontSizeForIOS(11, 3),
    fontFamily: 'AeonikRegular',
    fontWeight: '400',
    lineHeight: 15.84,
    borderColor: 'red',
  },
  invest: {
    color: '#fff',
    fontSize: adjustFontSizeForIOS(11, 3),
    fontFamily: 'AeonikMedium',
    fontWeight: '500',
    lineHeight: 15.84,
    borderColor: 'red',
  },
  feedStep: {
    borderColor: '#F1F5F9',
    borderWidth: 1,
    borderRadius: 10,
    overflow: 'hidden',
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginTop: 20,
  },

  actionFlex: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  investBtn: { backgroundColor: '#4691FE', paddingHorizontal: 15, borderRadius: 10, paddingVertical: 5 },
  bottomActionContainer: { flexDirection: 'row', gap: 20, alignItems: 'center' },
  bottomActionInnerContainer: { flex: 1, flexDirection: 'row', gap: 20 },
  rightContentFlex: { flexDirection: 'row', justifyContent: 'space-between' },
  usernameFlex: { flexDirection: 'row', gap: 9, alignItems: 'center', marginBottom: 5 },
});
