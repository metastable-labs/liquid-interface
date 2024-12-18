import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import ImageColors from 'react-native-image-colors';

import { adjustFontSizeForIOS, formatNumberWithSuffix } from '@/utils/helpers';

const PoolLiquidity = ({
  tokenAIconURL,
  reserveA,
  tokenATitle,
  reserveAUSD,
  reserveB,
  tokenBIconURL,
  tokenBTitle,
  reserveBUSD,
}: PoolDetails) => {
  const [tokenAColor, settokenAColor] = useState('#375DFB');
  const [tokenBColor, settokenBColor] = useState('#F2AE40');
  const [tokenAProgress, settokenAProgress] = useState(0.5);

  const values = [
    {
      iconURL: tokenAIconURL,
      tokenBalance: `${formatNumberWithSuffix(reserveA)}`,
      title: tokenATitle,
      tokenUSDValue: `${formatNumberWithSuffix(reserveAUSD)}`,
    },
    {
      iconURL: tokenBIconURL,
      tokenBalance: `${formatNumberWithSuffix(reserveB)}`,
      title: tokenBTitle,
      tokenUSDValue: `${formatNumberWithSuffix(reserveBUSD)}`,
    },
  ];

  const progressStyle = useAnimatedStyle(() => {
    return {
      width: withTiming(`${tokenAProgress * 100}%`, { duration: 500 }),
    };
  });

  useEffect(() => {
    const extractColors = async () => {
      const tokenAColors = await ImageColors.getColors(tokenAIconURL, {
        fallback: '#375DFB',
      });
      const tokenBColors = await ImageColors.getColors(tokenBIconURL, {
        fallback: '#F2AE40',
      });

      if (tokenAColors.platform === 'android') settokenAColor(tokenAColors.vibrant || '#375DFB');
      if (tokenAColors.platform === 'ios') settokenAColor(tokenAColors.background || '#375DFB');

      if (tokenBColors.platform === 'android') settokenBColor(tokenBColors.vibrant || '#F2AE40');
      if (tokenBColors.platform === 'ios') settokenBColor(tokenBColors.background || '#F2AE40');
    };

    extractColors();

    const totalBalance = reserveAUSD! + reserveBUSD!;
    settokenAProgress(reserveAUSD! / totalBalance);
  }, [tokenAIconURL, tokenBIconURL, reserveA, reserveB]);

  return (
    <View style={styles.root}>
      <Text style={styles.title}>Pool Liquidity</Text>

      <View style={styles.container}>
        <View style={styles.valueDistribution}>
          {values.map(({ iconURL, tokenBalance, tokenUSDValue, title }, index) => (
            <View key={index} style={styles.value}>
              <View style={styles.icon}>
                <FastImage
                  style={{ width: 18, height: 18 }}
                  source={{
                    uri: iconURL,
                    priority: FastImage.priority.high,
                  }}
                  resizeMode={FastImage.resizeMode.contain}
                />
              </View>

              <View style={styles.innerValue}>
                <View style={styles.textContainer}>
                  <Text style={styles.tokenAText}>
                    {tokenBalance}
                    <Text style={[styles.tokenAText, styles.titleText]}> {title}</Text>
                  </Text>
                </View>

                <Text style={styles.tokenBText}>{`$${tokenUSDValue}`}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={[styles.progressBackground, { backgroundColor: tokenBColor }]}>
          <Animated.View style={[styles.progress, progressStyle, { backgroundColor: tokenAColor }]} />
        </View>
      </View>
    </View>
  );
};

export default PoolLiquidity;

const styles = StyleSheet.create({
  root: {
    alignSelf: 'stretch',
    gap: 16,
  },

  title: {
    color: '#1A2001',
    fontSize: adjustFontSizeForIOS(16, 2),
    lineHeight: 19.2,
    fontWeight: '500',
    fontFamily: 'AeonikMedium',
  },

  container: {
    alignSelf: 'stretch',
    gap: 18,
  },

  valueDistribution: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  value: {
    flexDirection: 'row',
    gap: 6,
  },

  innerValue: {
    alignItems: 'flex-start',
    gap: 4,
  },

  icon: {
    width: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9999,
    borderWidth: 0.75,
    borderColor: '#EAEEF4',
    paddingTop: 5,
  },

  textContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
  },

  tokenAText: {
    color: '#0A0D14',
    fontSize: adjustFontSizeForIOS(14, 2),
    lineHeight: 19.84,
    fontWeight: '500',
    fontFamily: 'AeonikMedium',
    textAlign: 'center',
  },

  titleText: {
    color: '#868C98',
  },

  tokenBText: {
    color: '#525866',
    fontSize: adjustFontSizeForIOS(10, 2),
    lineHeight: 18.48,
    textAlign: 'center',
  },

  progressBackground: {
    width: '100%',
    height: 8,
    borderRadius: 10,
  },

  progress: {
    height: '100%',
    borderRadius: 10,
    borderRightWidth: 3,
    borderRightColor: '#FFFEF7',
  },
});
