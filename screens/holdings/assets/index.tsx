import { View, Text, StyleSheet } from 'react-native';

const Assets = () => {
  return (
    <View style={styles.container}>
      <Text>Assets Screen</Text>
    </View>
  );
};

export default Assets;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
