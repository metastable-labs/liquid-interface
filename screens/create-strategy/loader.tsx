import { Image, Modal, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';

const Loader = () => {
  return (
    <Modal style={styles.container} transparent>
      <View style={styles.innerWrapper}>
        <View style={styles.image}>
          <LottieView autoPlay loop source={require('../../assets/json/liquid loader animation.json')} />
        </View>
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
    width: 100,
    height: 130,
  },
});
