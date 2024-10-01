import { View, Text, StyleSheet } from 'react-native';

const Rewards = ({ type }: { type: RewardVariants }) => {
  return (
    <View style={styles.container}>
      <Text>Rewards Screen {type}</Text>
    </View>
  );
};

export default Rewards;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
