import { View, Text, StyleSheet, ScrollView } from 'react-native';

import PoolCard from './card';

const Pools = () => {
  const pools: Array<IPoolCard> = [
    {
      fees: 0.3,
      id: '1',
      lpBalance: 2_000,
      primaryIconURL:
        'https://res.cloudinary.com/dxnd4k222/image/upload/v1727119033/is3tphz7tf06jpj5g7x3.png',
      primaryTitle: 'USDC',
      secondaryIconURL:
        'https://res.cloudinary.com/dxnd4k222/image/upload/v1727119032/uwficdtvggd49apjfpt4.png',
      secondaryTitle: 'ETH',
      stakedBalance: 100,
      variant: 'stable',
    },
    {
      fees: 0.3,
      id: '2',
      lpBalance: 0,
      primaryIconURL:
        'https://res.cloudinary.com/dxnd4k222/image/upload/v1727119033/is3tphz7tf06jpj5g7x3.png',
      primaryTitle: 'USDC',
      secondaryIconURL:
        'https://res.cloudinary.com/dxnd4k222/image/upload/v1727119032/uwficdtvggd49apjfpt4.png',
      secondaryTitle: 'ETH',
      stakedBalance: 360,
      variant: 'volatile',
    },

    {
      fees: 0.3,
      id: '1',
      lpBalance: 2_000,
      primaryIconURL:
        'https://res.cloudinary.com/dxnd4k222/image/upload/v1727119033/is3tphz7tf06jpj5g7x3.png',
      primaryTitle: 'USDC',
      secondaryIconURL:
        'https://res.cloudinary.com/dxnd4k222/image/upload/v1727119032/uwficdtvggd49apjfpt4.png',
      secondaryTitle: 'ETH',
      stakedBalance: 0,
      variant: 'stable',
    },
    {
      fees: 0.3,
      id: '2',
      lpBalance: 200,
      primaryIconURL:
        'https://res.cloudinary.com/dxnd4k222/image/upload/v1727119033/is3tphz7tf06jpj5g7x3.png',
      primaryTitle: 'USDC',
      secondaryIconURL:
        'https://res.cloudinary.com/dxnd4k222/image/upload/v1727119032/uwficdtvggd49apjfpt4.png',
      secondaryTitle: 'ETH',
      stakedBalance: 360,
      variant: 'volatile',
    },
  ];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.header}>My Pools</Text>

      <View style={styles.poolsContainer}>
        {pools.map((pool, index) => (
          <PoolCard key={index} {...pool} />
        ))}
      </View>
    </ScrollView>
  );
};

export default Pools;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },

  contentContainer: {
    paddingBottom: 175,
    gap: 20,
  },

  header: {
    color: '#0F172A',
    fontSize: 20,
    lineHeight: 23.2,
    fontWeight: '500',
  },

  poolsContainer: {
    gap: 24,
  },
});
