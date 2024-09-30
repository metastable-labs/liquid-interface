import { View, Text, StyleSheet } from 'react-native';

const Pools = () => {
  return (
    <View style={styles.container}>
      <Text>Pools Screen</Text>
    </View>
  );
};

export default Pools;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
