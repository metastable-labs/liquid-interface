import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import Animated from 'react-native-reanimated';
import { BorrowIcon, DepositIcon, StakeIcon, SupplyIcon, SwatchIcon } from '@/assets/icons'; // Replace icons as needed
import { adjustFontSizeForIOS } from '@/utils/helpers';
import LQDPoolImages from '../pool-images';

const defaultAIconUrl = 'https://res.cloudinary.com/djzeufu4j/image/upload/v1732105634/tokenAIcon_jgy241.png';
const defaultBIconUrl = 'https://res.cloudinary.com/djzeufu4j/image/upload/v1732105634/tokenBIcon_wscb3p.png';
const connector = require('../../assets/images/connector.png');

const FeedStep = ({ variant, tokenAIconURL, tokenBIconURL, tokenA, tokenB, isLast, title = '' }: IFeedStep) => {
  const [tokenAIconError, setTokenAIconError] = useState(false);
  const [tokenBIconError, setTokenBIconError] = useState(false);

  const iconA = tokenAIconError ? defaultAIconUrl : tokenAIconURL || defaultAIconUrl;
  const iconB = tokenBIconError ? defaultBIconUrl : tokenBIconURL || defaultBIconUrl;
  const deposite = variant === 'deposit';

  const icons = {
    stake: <StakeIcon />,
    deposit: <DepositIcon />,
    borrow: <BorrowIcon />,
    supply: <SupplyIcon />,
  };

  const depositVariant = () => (
    <View style={styles.details}>
      <Text style={styles.variantText}>{variant}</Text>
      <Text style={styles.variantText}> into</Text>
      <View>
        <Text style={styles.tokenText}>
          {tokenA}/{tokenB}
        </Text>
      </View>
      <LQDPoolImages tokenAIconURL={iconA} tokenBIconURL={iconB} />
    </View>
  );

  const otherVariant = () => (
    <View style={styles.details}>
      <Text style={styles.variantText}>{variant}</Text>
      <FastImage style={styles.tokenIcon} source={{ uri: iconA }} onError={() => setTokenAIconError(true)} />
      <Text style={styles.tokenText}>{tokenA}</Text>
      <Text style={styles.variantText}> into</Text>
      <FastImage style={styles.tokenIcon} source={{ uri: iconB }} onError={() => setTokenBIconError(true)} />
      <Text style={styles.tokenText}>{tokenB}</Text>
    </View>
  );

  return (
    <Animated.View style={styles.container}>
      <View style={styles.connectorWrap}>
        <View style={styles.iconContainer}>{icons[variant]}</View>
        {!isLast && <FastImage style={{ height: 12, width: 1, marginBottom: 10 }} source={connector} />}
      </View>
      {deposite && depositVariant()}
      {!deposite && otherVariant()}
    </Animated.View>
  );
};

export default FeedStep;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 2,
  },

  connectorWrap: {
    alignItems: 'center',
    width: 32,
  },

  iconContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },

  connector: {
    width: 2,
    height: 20,
    flex: 1,
    marginBottom: 5,
  },

  details: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 2,
  },

  variantText: {
    fontSize: adjustFontSizeForIOS(11, 3),
    fontWeight: '400',
    color: '#64748B',
    fontFamily: 'AeonikRegular',
    textTransform: 'capitalize',
  },
  actionText: {
    fontSize: adjustFontSizeForIOS(11, 2),
    fontWeight: '600',
    color: '#0F172A',
    fontFamily: 'AeonikMedium',
  },

  tokenText: {
    fontSize: adjustFontSizeForIOS(11, 2),
    fontWeight: '400',
    color: '#64748B',
    fontFamily: 'AeonikBold',
  },

  tokenIcon: {
    width: 16,
    height: 16,
    marginHorizontal: 4,
  },
});
