import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Href } from 'expo-router';

import { adjustFontSizeForIOS, formatAmount, formatNumberWithSuffix, formatSymbol, roundUp } from '@/utils/helpers';
import useSystemFunctions from '@/hooks/useSystemFunctions';
import { setSelectedPool } from '@/store/pools';
import { PoolPairPaper } from './types';
import LQDPoolImages from '../pool-images';

const LQDPoolPairPaper = ({ pool, navigationVariant = 'primary', showFullSymbol }: PoolPairPaper) => {
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

  const tokenAIconURL = pool.token0.logoUrl;
  const tokenBIconURL = pool.token1.logoUrl;
  const symbol = formatSymbol(pool.symbol, showFullSymbol);
  const apr = formatAmount(pool.apr, 2);
  const fees = Number(pool.poolFee) > 1000 ? formatNumberWithSuffix(pool.poolFee) : roundUp(Number(pool.poolFee));
  const volume = formatNumberWithSuffix(vol);
  const tvl = pool.tvl;
  const isStable = pool.isStable;

  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <View style={styles.leftContainer}>
        <LQDPoolImages tokenAIconURL={tokenAIconURL} tokenBIconURL={tokenBIconURL} />

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

        <Text style={styles.volumeText}>VOL: ${volume}</Text>
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
    maxWidth: '70%',
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
    marginLeft: -6,
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
    color: '#B47818',
    fontSize: adjustFontSizeForIOS(11, 2),
    lineHeight: 13.64,
    fontFamily: 'AeonikRegular',
  },

  basicTextStable: {
    color: '#156146',
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
});
