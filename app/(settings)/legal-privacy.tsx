import { StyleSheet, Text, View } from 'react-native';

const LegalAndPrivacy = () => {
  return (
    <View style={styles.container}>
      <Text>Legal and Privacy</Text>
    </View>
  );
};

export default LegalAndPrivacy;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
