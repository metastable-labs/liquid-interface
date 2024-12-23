import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { adjustFontSizeForIOS } from '@/utils/helpers';
import { CloseIcon } from '@/assets/icons';
const slider3 = require('../../assets/images/slider-3.png');

const DepositToast = ({ title, subTitle, onPress, onClose }: DepositToast) => {
  return (
    <View style={styles.slideContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subTitle}>{subTitle}</Text>
        <Pressable style={styles.btn} onPress={onPress}>
          <Text style={styles.btnText}>Deposit</Text>
        </Pressable>
      </View>

      <Image source={slider3} style={[styles.image]} resizeMode="contain" />

      <Pressable style={styles.closeIcon} onPress={onClose}>
        <CloseIcon fill="#156146" />
      </Pressable>
    </View>
  );
};

export default DepositToast;

const styles = StyleSheet.create({
  slideContainer: {
    width: 'auto',
    justifyContent: 'center',
    paddingHorizontal: 20,
    position: 'relative',
    borderWidth: 1,
    borderRadius: 12,
    overflow: 'hidden',
    gap: 20,
    paddingVertical: 16,
    backgroundColor: '#EFFAF6',
    borderColor: '#CBF5E5',
  },

  textContainer: {
    width: '65%',
    gap: 6,
  },

  image: {
    position: 'absolute',
    right: -10,
    height: 50,
    width: 130,
    zIndex: 0,
    bottom: 0,
  },

  btn: {
    width: 80,
    height: 26,
    backgroundColor: '#156146',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },

  btnText: {
    color: '#fff',
    fontSize: adjustFontSizeForIOS(13, 1),
    lineHeight: 17.92,
    fontWeight: '500',
    fontFamily: 'AeonikMedium',
  },

  title: {
    color: '#156146',
    fontSize: adjustFontSizeForIOS(16, 1),
    lineHeight: 17.92,
    fontWeight: '700',
    fontFamily: 'QuantaGroteskProBold',
  },

  subTitle: {
    color: '#156146',
    fontSize: adjustFontSizeForIOS(12, 1),
    lineHeight: 17.64,
    fontWeight: '400',
    fontFamily: 'AeonikRegular',
  },

  contentContainerStyle: {
    overflow: 'hidden',
    gap: 20,
    paddingHorizontal: 17,
  },

  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});
