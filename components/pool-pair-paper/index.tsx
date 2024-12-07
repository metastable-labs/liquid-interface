import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Href } from 'expo-router';

import { adjustFontSizeForIOS, formatAmount, formatNumberWithSuffix, formatSymbol, roundUp } from '@/utils/helpers';
import useSystemFunctions from '@/hooks/useSystemFunctions';
import { setRecentSearchedPool, setSelectedPool } from '@/store/pools';
import { PoolPairPaper } from './types';
import LQDPoolImages from '../pool-images';
import LQShrimeLoader from '../loader';
import LQDImage from '../image';
import { CheckIcon, FillCheckIcon } from '@/assets/icons';

const LQDPoolPairPaper = ({ pool, navigationVariant = 'primary', showFullSymbol, selected }: PoolPairPaper) => {
  const { router, dispatch } = useSystemFunctions();

  const paths = {
    primary: `/(tabs)/home/${pool.address}` as Href<string>,
    secondary: `/(tabs)/holdings/${pool.address}` as Href<string>,
  };

  const handlePress = () => {
    dispatch(setSelectedPool(pool));
    dispatch(setRecentSearchedPool(pool));
    router.push(paths[navigationVariant]);
  };

  const tokenIconURL = pool.token0.logoUrl;
  const title = pool.symbol;
  const subTitle = '4,506 USDC';

  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <View style={styles.leftContainer}>
        <LQDImage height={24} width={24} src={tokenIconURL} />

        <View style={styles.detailContainer}>
          <Text style={styles.detailHeader}>{title}</Text>

          {subTitle && (
            <View style={styles.details}>
              <Text style={styles.detailText}>{subTitle}</Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.volumeWrapper}>{selected && <FillCheckIcon />}</View>
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
