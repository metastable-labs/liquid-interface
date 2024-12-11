import { StyleSheet, View } from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import Modal from 'react-native-modal';

const Loader = ({
  visible = true,
  backgroundColor = 'rgba(87, 87, 87, 0.73)',
  animationSource = require('../../assets/json/liquid loader animation.json'),
}) => {
  if (!visible) return null;

  return (
    <Modal style={{ padding: 0, margin: 0 }} statusBarTranslucent isVisible={visible} animationIn="fadeIn">
      <View style={[styles.innerWrapper, { backgroundColor }]}>
        <View style={styles.image}>
          <LottieView autoPlay loop source={animationSource} />
        </View>
      </View>
    </Modal>
  );
};

export default Loader;

const styles = StyleSheet.create({
  innerWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 130,
  },
});
