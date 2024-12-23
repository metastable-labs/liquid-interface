import { ActivityIndicator, StyleSheet, View } from 'react-native';

const DefaultFooterLoader = () => (
  <View style={styles.loaderContainer}>
    <ActivityIndicator size="small" color="#4691FE" />
  </View>
);

export default DefaultFooterLoader;

const styles = StyleSheet.create({
  loaderContainer: {
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
