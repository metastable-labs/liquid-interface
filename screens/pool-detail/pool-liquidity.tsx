import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import ImageColors from 'react-native-image-colors';

import { adjustFontSizeForIOS } from '@/utils/helpers';

const PoolLiquidity = ({
  primaryIconURL,
  primaryBalance,
  primaryTitle,
  primaryUSDValue,
  secondaryBalance,
  secondaryIconURL,
  secondaryTitle,
  secondaryUSDValue,
}: IPool) => {
  const [primaryColor, setPrimaryColor] = useState('#375DFB');
  const [secondaryColor, setSecondaryColor] = useState('#F2AE40');
  const [primaryProgress, setPrimaryProgress] = useState(0.5);

  const values = [
    {
      iconURL: primaryIconURL,
      primaryText: `${primaryBalance.toLocaleString()}`,
      title: primaryTitle,
      secondaryText: `${primaryUSDValue.toLocaleString()}`,
    },
    {
      iconURL: secondaryIconURL,
      primaryText: `${secondaryBalance.toLocaleString()}`,
      title: secondaryTitle,
      secondaryText: `${secondaryUSDValue.toLocaleString()}`,
    },
  ];

  const progressStyle = useAnimatedStyle(() => {
    return {
      width: withTiming(`${primaryProgress * 100}%`, { duration: 500 }),
    };
  });

  useEffect(() => {
    const extractColors = async () => {
      const primaryColors = await ImageColors.getColors(primaryIconURL, {
        fallback: '#375DFB',
      });
      const secondaryColors = await ImageColors.getColors(secondaryIconURL, {
        fallback: '#F2AE40',
      });

      if (primaryColors.platform === 'android') setPrimaryColor(primaryColors.vibrant || '#375DFB');
      if (primaryColors.platform === 'ios') setPrimaryColor(primaryColors.background || '#375DFB');

      if (secondaryColors.platform === 'android') setSecondaryColor(secondaryColors.vibrant || '#F2AE40');
      if (secondaryColors.platform === 'ios') setSecondaryColor(secondaryColors.background || '#F2AE40');
    };

    extractColors();

    const totalBalance = primaryBalance + secondaryBalance;
    setPrimaryProgress(primaryBalance / totalBalance);
  }, [primaryIconURL, secondaryIconURL, primaryBalance, secondaryBalance]);

  return (
    <View style={styles.root}>
      <Text style={styles.title}>Pool Liquidity</Text>

      <View style={styles.container}>
        <View style={styles.valueDistribution}>
          {values.map(({ iconURL, primaryText, secondaryText, title }, index) => (
            <View key={index} style={styles.value}>
              <View style={styles.icon}>
                <Image source={{ uri: iconURL }} style={{ width: 18, height: 18 }} />
              </View>

              <View style={styles.textContainer}>
                <Text style={styles.primaryText}>
                  {primaryText}
                  <Text style={[styles.primaryText, styles.titleText]}> {title}</Text>
                </Text>
                <Text style={styles.secondaryText}>{`($${secondaryText})`}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={[styles.progressBackground, { backgroundColor: secondaryColor }]}>
          <Animated.View style={[styles.progress, progressStyle, { backgroundColor: primaryColor }]} />
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
    alignItems: 'center',
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
  },

  textContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
  },

  primaryText: {
    color: '#0A0D14',
    fontSize: adjustFontSizeForIOS(16, 2),
    lineHeight: 19.84,
    fontWeight: '500',
    fontFamily: 'AeonikMedium',
    textAlign: 'center',
  },

  titleText: {
    color: '#868C98',
  },

  secondaryText: {
    color: '#525866',
    fontSize: adjustFontSizeForIOS(14, 2),
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
