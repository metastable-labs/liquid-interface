import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { FillCheckIcon } from '@/assets/icons';
import ICONS from '@/constants/icons';
import { adjustFontSizeForIOS } from '@/utils/helpers';
import { IProtocolCard } from './types';

const LQDProtocolCard = ({ selected, onSelect, variant, protocol }: IProtocolCard) => {
  const { title } = protocol;

  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.7} onPress={onSelect}>
      <View style={styles.innerWrapper}>
        {ICONS[variant]}
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
