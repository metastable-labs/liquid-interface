import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Href } from 'expo-router';

import useSystemFunctions from '@/hooks/useSystemFunctions';
import { adjustFontSizeForIOS } from '@/utils/helpers';
import { ArrowDownIcon, ArrowUpAltIcon } from '@/assets/icons';
import { setSelectedPool } from '@/store/pools';
import { PoolPairCard } from './types';
import LQDPoolImages from '../pool-images';
import LQShrimeLoader from '../loader';

const backgroundColors = ['#FDEAEA', '#EFFAF6'];
const textColors = ['#A4262C', '#156146'];

const LQDPoolPairCard = ({ pool, navigationVariant = 'primary', loading = false }: PoolPairCard) => {
  const { router, dispatch } = useSystemFunctions();

  const paths = {
    primary: `/(tabs)/home/${pool.address}` as Href<string>,
    secondary: `/(tabs)/holdings/${pool.address}` as Href<string>,
  };

  const handlePress = () => {
    dispatch(setSelectedPool(pool));
    router.push(paths[navigationVariant]);
  };

  const tokenAIconURL = pool.token0.logoUrl;
  const tokenBIconURL = pool.token1.logoUrl;
  const symbol = pool.symbol.split('-')[1].replace('/', ' / ');
  const increased = true;
  const change = pool.apr;

  return (
    <>
      {!loading && (
        <TouchableOpacity onPress={handlePress} style={styles.container}>
          <View style={styles.topContainer}>
            <LQDPoolImages tokenAIconURL={tokenAIconURL} tokenBIconURL={tokenBIconURL} />

            <View style={[styles.changeContainer, { backgroundColor: backgroundColors[+increased] }]}>
              {increased ? (
                <ArrowUpAltIcon width={12} height={12} fill={textColors[+increased]} />
              ) : (
                <ArrowDownIcon width={12} height={12} fill={textColors[+increased]} />
              )}
              <Text style={[styles.change, { color: textColors[+increased] }]}>{change}%</Text>
            </View>
          </View>

          <Text style={styles.title}>{symbol}</Text>
        </TouchableOpacity>
      )}

      {loading && <LQShrimeLoader style={styles.loader} />}
    </>
  );
};

export default LQDPoolPairCard;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#FFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#EAEEF4',
    gap: 16,
  },

  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18 + 6,
  },

  title: {
    color: '#1E293B',
    fontSize: adjustFontSizeForIOS(13, 2),
    lineHeight: 18.48,
    fontWeight: '500',
    fontFamily: 'AeonikMedium',
  },

  changeContainer: {
    padding: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 2,
    borderRadius: 8,
  },

  change: {
    fontSize: adjustFontSizeForIOS(11, 2),
    lineHeight: 13.64,
    fontWeight: '500',
    fontFamily: 'AeonikMedium',
  },

  // loader
  loader: { height: 90, width: 140, borderRadius: 6 },
});
