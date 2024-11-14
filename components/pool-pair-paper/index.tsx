import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { Href } from 'expo-router';

import { adjustFontSizeForIOS, formatAmount, formatNumberWithSuffix } from '@/utils/helpers';
import useSystemFunctions from '@/hooks/useSystemFunctions';
import { setSelectedPool } from '@/store/pools';
import { PoolPairPaper } from './types';

const LQDPoolPairPaper = ({ pool, navigationVariant = 'primary' }: PoolPairPaper) => {
  const { router, dispatch } = useSystemFunctions();

  const paths = {
    primary: `/(tabs)/home/${pool.address}` as Href<string>,
    secondary: `/(tabs)/holdings/${pool.address}` as Href<string>,
  };

  const handlePress = () => {
    dispatch(setSelectedPool(pool));
    router.push(paths[navigationVariant]);
  };

  const vol = Number(Number(pool.totalVolumeUSD).toFixed(4));

  const primaryIconURL = pool.token0.logoUrl;
  const secondaryIconURL = pool.token1.logoUrl;
  const symbol = pool.symbol.split('-')[1].replace('/', ' / ');
  const apr = formatAmount(pool.apr, 2);
  const fees = '0';
  const volume = formatNumberWithSuffix(vol);
  const tvl = pool.tvl;
  const isStable = pool.isStable;

  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <View style={styles.leftContainer}>
        <View style={styles.iconContainer}>
          {[primaryIconURL, secondaryIconURL].map((iconURL, index) => (
            <View key={index} style={[styles.icon, index === 0 && { position: 'relative', zIndex: 1 }]}>
              <Image source={{ uri: iconURL }} style={styles.image} />
            </View>
          ))}
        </View>

        <View style={styles.detailContainer}>
          <Text style={styles.detailHeader}>{symbol}</Text>

          <View style={styles.details}>
            <Text style={isStable ? styles.basicTextStable : styles.basicTextVolatile}>{isStable ? 'Basic Stable' : 'Basic Volatile'}</Text>

            <View style={styles.separator}>
              <View style={styles.separatorCircle} />
            </View>

            <Text style={styles.detailText}>{fees}% Fee</Text>
          </View>
        </View>
      </View>

      <View style={styles.volumeWrapper}>
        <Text style={styles.aprText}>APR: {apr.toLocaleString()}%</Text>

        <Text style={styles.volumeText}>VOL: ${formatNumberWithSuffix(volume)}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default LQDPoolPairPaper;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  leftContainer: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
    gap: 10 + 6,
  },

  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  icon: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: '#EAEEF4',
    marginRight: -6,
  },

  detailContainer: {
    justifyContent: 'center',
    gap: 4,
  },

  detailHeader: {
    color: '#1E293B',
    fontSize: adjustFontSizeForIOS(14, 2),
    lineHeight: 18.48,
    fontWeight: '500',
    fontFamily: 'AeonikMedium',
  },

  details: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
    gap: 4,
  },

  detailText: {
    color: '#64748B',
    fontSize: adjustFontSizeForIOS(11, 2),
    lineHeight: 13.64,
    fontFamily: 'AeonikRegular',
  },

  basicTextVolatile: {
    color: '#AF1D38',
    fontSize: adjustFontSizeForIOS(11, 2),
    lineHeight: 13.64,
    fontFamily: 'AeonikRegular',
  },

  basicTextStable: {
    color: '#B47818',
    fontSize: adjustFontSizeForIOS(11, 2),
    lineHeight: 13.64,
    fontFamily: 'AeonikRegular',
  },

  separator: {
    position: 'relative',
    width: 7,
    height: 0.5,
    backgroundColor: '#0C050766',
  },

  separatorCircle: {
    width: 3,
    height: 3,
    borderRadius: 9999,
    backgroundColor: '#0C0507',
    position: 'absolute',
    top: -1.35,
    left: '26%',
  },

  volumeWrapper: {
    alignItems: 'flex-end',
    gap: 8,
  },

  aprText: {
    color: '#156146',
    fontSize: adjustFontSizeForIOS(12, 2),
    lineHeight: 16.12,
    fontWeight: '500',
    textTransform: 'uppercase',
    fontFamily: 'AeonikMedium',
  },

  volumeText: {
    color: '#64748B',
    fontSize: adjustFontSizeForIOS(11, 2),
    textTransform: 'uppercase',
    fontFamily: 'AeonikRegular',
  },

  image: {
    width: 24,
    height: 24,
    borderRadius: 24,
  },
});
