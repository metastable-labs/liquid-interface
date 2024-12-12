import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { BorrowIcon, DepositIcon, FillCheckIcon, CuratorIcon, StakeIcon, CoinbaseWalletIcon, DebitCardIcon } from '@/assets/icons';
import LQDImage from '../image';
import { adjustFontSizeForIOS } from '@/utils/helpers';
import { IActionCard } from './types';

const LQDActionCard = ({ selected, action, actions, variant }: IActionCard) => {
  const { title } = actions;

  const icons = {
    stake: <StakeIcon fill="#1E293B" height={24} width={24} />,
    deposit: <DepositIcon fill="#1E293B" height={24} width={24} />,
    borrow: <BorrowIcon fill="#1E293B" height={24} width={24} />,
    sort: <CuratorIcon />,
    supply: null,
    debitCard: <DebitCardIcon />,
    crypto: <CuratorIcon />,
    coinBase: <CoinbaseWalletIcon />,
  };

  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.7} onPress={action}>
      <View style={styles.innerWrapper}>
        {icons[variant]}
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.volumeWrapper}>{selected && <FillCheckIcon />}</View>
    </TouchableOpacity>
  );
};

export default LQDActionCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8FAFC',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    height: 52,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  innerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  volumeWrapper: {
    alignItems: 'flex-end',
    gap: 8,
  },

  title: {
    color: '#1E293B',
    fontSize: adjustFontSizeForIOS(16, 2),
    lineHeight: 19.2,
    fontWeight: '500',
    fontFamily: 'AeonikMedium',
  },
});
