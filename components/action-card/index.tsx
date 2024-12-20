import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import { CoinbaseWalletIcon, DebitCardIcon, FillCheckIcon, SoonIcon } from '@/assets/icons';
import { adjustFontSizeForIOS } from '@/utils/helpers';
import { IActionCard } from './types';
import ICONS from '@/constants/icons';

const LQDActionCard = ({ selected, onSelect, actions, variant, comingSoon }: IActionCard) => {
  const { title } = actions;

  const colorType = variant === 'disconnect' ? '#AF1D38' : comingSoon ? '#94A3B8' : '#1E293B';

  const icons = {
    ...ICONS,
    debitCard: <DebitCardIcon fill="#94A3B8" />,
    coinBase: <CoinbaseWalletIcon fill="#94A3B8" />,
  };

  return (
    <TouchableOpacity style={[styles.container]} activeOpacity={0.7} onPress={onSelect}>
      <View style={styles.innerWrapper}>
        {icons[variant]}
        <Text style={[styles.title, { color: colorType }]}>{title}</Text>
      </View>
      {comingSoon && <SoonIcon />}
      {!comingSoon && <View style={styles.volumeWrapper}>{selected && <FillCheckIcon />}</View>}
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
