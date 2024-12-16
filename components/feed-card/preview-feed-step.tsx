import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import Animated from 'react-native-reanimated';
import { AerodromeIcon, BorrowIcon, DepositIcon, MoonWellIcon, MorphoIcon, StakeIcon, SupplyIcon } from '@/assets/icons';
import { adjustFontSizeForIOS } from '@/utils/helpers';
import LQDPoolImages from '../pool-images';
import LQDTokenImage from '../pool-images/token-image';

const connector = require('../../assets/images/connector.png');
const icons = {
  stake: <StakeIcon />,
  deposit: <DepositIcon />,
  borrow: <BorrowIcon />,
  supply: <SupplyIcon />,
  aerodrome: <AerodromeIcon height={24} width={24} />,
  moonwell: <MoonWellIcon height={24} width={24} />,
  morpho: <MorphoIcon height={24} width={24} />,
};

const PreviewFeedStep = ({ variant, tokenIconURL, token, isLast, title = '', protocolIcon, protocolTitle }: IFeedStep) => {
  const deposite = variant === 'deposit';

  const depositVariant = () => (
    <View style={styles.details}>
      <Text style={styles.variantText}>{variant}</Text>
      <Text style={styles.variantText}> into</Text>
      <View>
        <Text style={styles.tokenText}>{token}</Text>
      </View>
      <LQDPoolImages tokenAIconURL={tokenIconURL} tokenBIconURL={tokenIconURL} />
    </View>
  );

  const otherVariant = () => (
    <View style={styles.details}>
      <Text style={styles.variantText}>{variant}</Text>
      <LQDTokenImage size={16} iconURL={tokenIconURL} />
      <Text style={styles.tokenText}>{token}</Text>

      <Text style={styles.variantText}> into</Text>

      {icons[protocolIcon]}
      <Text style={styles.tokenText}>{protocolTitle}</Text>
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

export default PreviewFeedStep;

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
