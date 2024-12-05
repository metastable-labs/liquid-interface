import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import Header from '../home/header';
import { LQDBottomSheet } from '@/components';

const Discover = () => {
  const [show, setShow] = useState(false);
  return (
    <View style={styles.container}>
      <Header amount={3333} action={() => setShow((prev) => !prev)} />
      <LQDBottomSheet show={show} title="Sort by" variant="primary" onClose={() => setShow((prev) => !prev)}></LQDBottomSheet>
    </View>
  );
};

export default Discover;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
});
