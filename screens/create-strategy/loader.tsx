import { Image, Modal, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { LQDImage } from '@/components';
import FastImage from 'react-native-fast-image';

const Loader = () => {
  return (
    <Modal style={styles.container} transparent>
      <View style={styles.innerWrapper}>
        <Image style={styles.image} source={require('../../assets/images/lottie-loader.png')} resizeMode={FastImage.resizeMode.contain} />
      </View>
    </Modal>
  );
};

export default Loader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerWrapper: {
    backgroundColor: 'rgba(87, 87, 87, 0.73)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 72,
  },
});
