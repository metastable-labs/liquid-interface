import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Header from './header';
import Chart from './chart';

const POOL: IPool = {
  id: '1',
  primaryIconURL:
    'https://res.cloudinary.com/dxnd4k222/image/upload/v1727119033/is3tphz7tf06jpj5g7x3.png',
  primaryTitle: 'USDC',
  secondaryIconURL:
    'https://res.cloudinary.com/dxnd4k222/image/upload/v1728237253/qxapalnjebncnqbogs7n.png',
  secondaryTitle: 'cbBTC',
  condition: 'stable',
  fee: 0.3,
};

const PoolDetail = ({ poolId }: IPoolDetail) => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.containerContent}
    >
      <View style={styles.topContainer}>
        <Header {...POOL} />

        <Chart />
      </View>
    </ScrollView>
  );
};

export default PoolDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 54,
    paddingTop: 20,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },

  containerContent: {
    paddingBottom: 175,
  },

  topContainer: {
    gap: 36,
  },
});
