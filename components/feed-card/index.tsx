import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import { CommentIcon, FlashIcon, MoreIcon, ReTweetIcon, ShareIcon, SwatchIcon } from '@/assets/icons';
import { adjustFontSizeForIOS } from '@/utils/helpers';
import FeedStep from './feed-step';

const iconURL = 'https://res.cloudinary.com/djzeufu4j/image/upload/v1732105634/tokenBIcon_wscb3p.png';
const setupSteps: Array<any> = [
  {
    variant: 'supply',
    tokenA: 'cbBTC',
    tokenB: 'moonWell',
    tokenAIconURL: 'https://res.cloudinary.com/djzeufu4j/image/upload/v1732105634/tokenAIcon_jgy241.png',
    tokenBIconURL: 'https://res.cloudinary.com/djzeufu4j/image/upload/v1732105634/tokenBIcon_wscb3p.png',
  },
  {
    variant: 'deposit',
    tokenA: 'Borrowed USDC',
    tokenB: 'Morpho',
    tokenAIconURL: 'https://res.cloudinary.com/djzeufu4j/image/upload/v1732105634/tokenAIcon_jgy241.png',
    tokenBIconURL: 'https://res.cloudinary.com/djzeufu4j/image/upload/v1732105634/tokenBIcon_wscb3p.png',
  },

  {
    variant: 'borrow',
    tokenA: 'USDC',
    tokenB: 'Base',
    tokenAIconURL: 'https://res.cloudinary.com/djzeufu4j/image/upload/v1732105634/tokenAIcon_jgy241.png',
    tokenBIconURL: 'https://res.cloudinary.com/djzeufu4j/image/upload/v1732105634/tokenBIcon_wscb3p.png',
  },
  {
    isLast: true,
    variant: 'stake',
    tokenA: 'DAI',
    tokenB: 'USDC',
    tokenAIconURL: 'https://res.cloudinary.com/djzeufu4j/image/upload/v1732105634/tokenAIcon_jgy241.png',
    tokenBIconURL: 'https://res.cloudinary.com/djzeufu4j/image/upload/v1732105634/tokenBIcon_wscb3p.png',
  },
];

const LQDFeedCard = ({ feed }: FeedCard) => {
  return (
    <View style={styles.container}>
      <View>
        {/* top */}
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <FastImage
            style={styles.image}
            source={{
              uri: iconURL,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
          {/*  */}
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View>
                <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center', marginBottom: 5 }}>
                  <Text style={styles.username}>@Nurayyy.eth</Text>
                  <Text style={styles.time}>2h</Text>
                </View>
                <Text style={styles.address} numberOfLines={1}>
                  0xc61...87f7a
                </Text>
              </View>
              <MoreIcon />
            </View>
          </View>
        </View>
        {/* top */}
        {/* second */}
        <View style={styles.feedStep}>
          {setupSteps.map((step, index) => (
            <FeedStep
              key={index}
              variant={step.variant}
              tokenA={step.tokenA}
              tokenB={step.tokenB}
              tokenAIconURL={step.tokenAIcon}
              tokenBIconURL={step.tokenBIcon}
              title={step.title}
              isLast={step.isLast}
            />
          ))}
        </View>
        {/* second */}
        {/* third */}
        <View style={{ marginVertical: 20, gap: 15 }}>
          <Text style={styles.title}>Moonwell - USDC</Text>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <Text style={styles.estimate}>Est. APY</Text>
            <Text style={styles.percentage}>65.45%</Text>
          </View>
          <Text style={styles.description}>This strategy starts as an ease in for first and second quaterss of 2025</Text>
          <Pressable>
            <Text style={styles.seeMore}>See more...</Text>
          </Pressable>
        </View>
        {/* third */}
        {/* fouth */}
        <View style={{ flexDirection: 'row', gap: 20, alignItems: 'center' }}>
          <View style={{ flex: 1, flexDirection: 'row', gap: 20 }}>
            <Pressable style={{ backgroundColor: '#4691FE', paddingHorizontal: 15, borderRadius: 10, paddingVertical: 5 }}>
              <Text style={styles.invest}>Invest</Text>
            </Pressable>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
              <CommentIcon />
              <Text style={styles.actionText}>26</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
              <ReTweetIcon />
              <Text style={styles.actionText}>26</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
              <FlashIcon />
              <Text style={styles.actionText}>26</Text>
            </View>
          </View>
          <ShareIcon />
        </View>
        {/* fouth */}
      </View>
    </View>
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
    fontSize: adjustFontSizeForIOS(14, 3),
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
    fontSize: adjustFontSizeForIOS(12, 3),
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
    fontSize: adjustFontSizeForIOS(15, 2),
    fontFamily: 'AeonikRegular',
    fontWeight: '400',
    lineHeight: 25,
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
});