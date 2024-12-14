import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import FastImage from 'react-native-fast-image';

import { CommentIcon, FlashIcon, MoreIcon, ReTweetIcon, ShareIcon, SwatchIcon } from '@/assets/icons';
import { adjustFontSizeForIOS, formatTimestamp, truncate } from '@/utils/helpers';
import FeedStep from './feed-step';

const photo = 'https://pics.craiyon.com/2023-08-02/7a951cac85bd4aa2b0e70dbaabb8404e.webp';
const maxDescriptionLength = 40;

const LQDFeedCard = ({ feed, onPressInvest, onPressComment, onPressShare, onPressLike, onNavigate }: FeedCard) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const { steps, curatorAddress, createdAt, name, description, metrics } = feed;
  const { commentCount, likeCount, repostCount, apy } = metrics;

  const truncatedDescription = description.substring(0, maxDescriptionLength);

  const handlePressAction = (action?: () => void) => {
    action?.();
    if (!action) {
      onNavigate?.();
    }
  };

  return (
    <Pressable style={styles.container} onPress={() => handlePressAction(onNavigate)}>
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
                  <Text style={styles.username}>Meister</Text>
                  <Text style={styles.time}>{formatTimestamp(createdAt)}</Text>
                </View>
                <Text style={styles.address} numberOfLines={1}>
                  {truncate(curatorAddress)}
                </Text>
              </View>
              <MoreIcon />
            </View>
          </View>
        </View>

        <View style={styles.feedStep}>
          {steps.map((step, index: number) => (
            <FeedStep key={index} {...step} isLast={steps.length == index} />
          ))}
        </View>

        <View style={{ marginVertical: 20, gap: 15 }}>
          <Text style={styles.title}>{name}</Text>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <Text style={styles.estimate}>Est. APY</Text>
            <Text style={styles.percentage}>{apy}%</Text>
          </View>
          <Text style={styles.description}>{isExpanded ? description : truncatedDescription}</Text>

          {description.length > maxDescriptionLength && !isExpanded && (
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
          <View style={styles.bottomActionContainer}>
            <View style={styles.bottomActionInnerContainer}>
              {onPressInvest && (
                <Pressable style={styles.investBtn} onPress={() => handlePressAction(onPressInvest)}>
                  <Text style={styles.invest}>Invest</Text>
                </Pressable>
              )}

              <Pressable onPress={() => handlePressAction(onPressComment)} style={styles.actionFlex}>
                <CommentIcon />
                <Text style={styles.actionText}>{commentCount}</Text>
              </Pressable>
              <Pressable onPress={() => handlePressAction(onPressShare)} style={styles.actionFlex}>
                <ReTweetIcon />
                <Text style={styles.actionText}>{repostCount}</Text>
              </Pressable>
              <Pressable onPress={() => handlePressAction(onPressLike)} style={styles.actionFlex}>
                <FlashIcon />
                <Text style={styles.actionText}>{likeCount}</Text>
              </Pressable>
            </View>
            <Pressable>
              <ShareIcon />
            </Pressable>
          </View>
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
