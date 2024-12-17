import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import FastImage from 'react-native-fast-image';

import { CommentIcon, FlashIcon, MoreIcon, ReTweetIcon, ShareIcon } from '@/assets/icons';
import { adjustFontSizeForIOS, formatTimestamp, truncate } from '@/utils/helpers';
import FeedStep from './feed-step';
import useSystemFunctions from '@/hooks/useSystemFunctions';
import { useLikeMutation } from '@/services/feeds/queries';

const maxDescriptionLength = 40;

const LQDFeedCard = ({ feed, isDetailPage, handleCommentPress }: FeedCard) => {
  const { router } = useSystemFunctions();

  const { steps, curator, createdAt, name, description, metrics, userInteraction, id } = feed;
  const { commentCount, repostCount, apy, likeCount } = metrics;
  const { address: curatorAddress, avatarUrl, username } = curator;
  const truncatedDescription = description.substring(0, maxDescriptionLength);

  const likeMutation = useLikeMutation(id);

  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const handleInvestPress = () => {
    console.log('Invest');
  };

  const handleRepostPress = () => {
    console.log('Repost');
  };

  const handleLikePress = () => {
    likeMutation.mutate();
  };

  const handleSharePress = () => {
    console.log('Share');
  };

  const handleMorePress = () => {
    console.log('More');
  };

  const handleNavigate = () => {
    if (isDetailPage) return;

    router.push(`/details/${id}`);
  };

  return (
    <Pressable style={styles.container} onPress={handleNavigate}>
      <View>
        <View style={{ flexDirection: 'row', gap: 5 }}>
          <FastImage
            style={styles.image}
            source={{
              uri: avatarUrl,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.contain}
          />

          <View style={{ flex: 1 }}>
            <View style={styles.rightContentFlex}>
              <View>
                <View style={styles.usernameFlex}>
                  <Text style={styles.username} numberOfLines={1}>
                    {username}
                  </Text>
                  <Text style={styles.time}>{formatTimestamp(createdAt)}</Text>
                </View>
                <Text style={styles.address} numberOfLines={1}>
                  {truncate(curatorAddress)}
                </Text>
              </View>

              <TouchableOpacity onPress={handleMorePress}>
                <MoreIcon />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.feedStep}>
          {steps.map((step, index: number) => (
            <FeedStep key={index} step={step} isLast={steps.length - 1 == index} />
          ))}
        </View>

        <View style={{ marginVertical: 20, gap: 15 }}>
          <Text style={styles.title}>{name}</Text>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <Text style={styles.estimate}>Est. APY</Text>
            <Text style={styles.percentage}>{apy}%</Text>
          </View>
          <Text style={styles.description}>{isExpanded ? description : `${truncatedDescription}...`}</Text>

          {isDetailPage && description.length > maxDescriptionLength && !isExpanded && (
            <TouchableOpacity onPress={handleToggle}>
              <Text style={styles.seeMore}>See more...</Text>
            </TouchableOpacity>
          )}

          {isExpanded && (
            <TouchableOpacity onPress={handleToggle}>
              <Text style={styles.seeMore}>See less...</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.bottomActionContainer}>
          <View style={styles.bottomActionContainer}>
            <View style={styles.bottomActionInnerContainer}>
              <TouchableOpacity style={styles.investBtn} onPress={handleInvestPress}>
                <Text style={styles.invest}>Invest</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleCommentPress} style={styles.actionFlex}>
                <CommentIcon />
                <Text style={styles.actionText}>{commentCount}</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleRepostPress} style={styles.actionFlex}>
                <ReTweetIcon />
                <Text style={styles.actionText}>{repostCount}</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleLikePress} style={styles.actionFlex}>
                {userInteraction.hasLiked ? <FlashIcon fill="#F2AE40" bg="#F2AE40" /> : <FlashIcon />}

                <Text style={styles.actionText}>{likeCount}</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={handleSharePress}>
              <ShareIcon />
            </TouchableOpacity>
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
  usernameFlex: {
    flexDirection: 'row',
    gap: 9,
    alignItems: 'center',
    marginBottom: 5,
    maxWidth: '70%',
  },
});
