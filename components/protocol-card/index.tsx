import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { FillCheckIcon } from '@/assets/icons';
import { IProtocolCard } from './types';
import LQDImage from '../image';
import { adjustFontSizeForIOS } from '@/utils/helpers';

const image = 'https://pics.craiyon.com/2023-08-02/7a951cac85bd4aa2b0e70dbaabb8404e.webp';
const LQDProtocolCard = ({ selected, action, protocol }: IProtocolCard) => {
  const { title, icon } = protocol;

  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.7} onPress={action}>
      <View style={styles.innerWrapper}>
        <LQDImage src={icon || image} width={30} height={30} />
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
