import React from 'react';
import { StyleSheet, Platform, StatusBar, View, Text } from 'react-native';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home Screen</Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 34,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 24,
  },
  error: {
    color: 'red',
    marginBottom: 8,
    fontSize: 14,
  },
});
