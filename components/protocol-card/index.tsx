import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { AerodromeIcon, BorrowIcon, DepositIcon, FillCheckIcon, MoonWellIcon, MorphoIcon } from '@/assets/icons';
import { IProtocolCard } from './types';
import { adjustFontSizeForIOS } from '@/utils/helpers';

const LQDProtocolCard = ({ selected, action, variant, protocol }: IProtocolCard) => {
  const { title, icon } = protocol;

  const icons = {
    aerodrome: <AerodromeIcon height={24} width={24} />,
    moonwell: <MoonWellIcon height={24} width={24} />,
    morpho: <MorphoIcon height={24} width={24} />,
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

export default LQDProtocolCard;

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
