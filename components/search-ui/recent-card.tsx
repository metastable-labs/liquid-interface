import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';

import useSystemFunctions from '@/hooks/useSystemFunctions';
import { adjustFontSizeForIOS } from '@/utils/helpers';
import useAppActions from '@/store/app/actions';
import { IRecentCard } from './types';
import LQDPoolImages from '../pool-images';

const RecentCard = ({ pool, navigationVariant = 'primary' }: IRecentCard) => {
  const { router, pathname } = useSystemFunctions();
  const { searchIsFocused } = useAppActions();
  const onPress = () => {
    searchIsFocused(false);
    router.push(`/(tabs)/home/${pool.address}`);
  };

  const tokenAIconURL = pool.token0.logoUrl;
  const tokenBIconURL = pool.token1.logoUrl;
  const symbol = pool.symbol.split('-')[1].replace('/', ' / ');

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.iconContainer}>
        <LQDPoolImages tokenAIconURL={tokenAIconURL} tokenBIconURL={tokenBIconURL} />
      </View>

      <Text style={styles.text}>{symbol}</Text>
    </TouchableOpacity>
  );
};

export default RecentCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8 + 6,
    paddingHorizontal: 8,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#EAEEF4',
    backgroundColor: '#fff',
    marginBottom: 20,
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

  text: {
    color: '#1E293B',
    fontSize: adjustFontSizeForIOS(14, 2),
    lineHeight: 18.48,
    fontWeight: '500',
    fontFamily: 'AeonikMedium',
  },
});
