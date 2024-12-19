import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

import useSystemFunctions from '@/hooks/useSystemFunctions';
import { adjustFontSizeForIOS } from '@/utils/helpers';
import useAppActions from '@/store/app/actions';
import { IPopularAssetCard } from './types';
import LQDImage from '../image';

const PopularAssetCard = ({ pool, navigationVariant = 'primary' }: IPopularAssetCard) => {
  const { router, pathname } = useSystemFunctions();
  const { searchIsFocused, showSearch } = useAppActions();
  const onPress = () => {
    searchIsFocused(false);
    showSearch(true);
  };

  const tokenIconURL = pool.token0.logoUrl;
  const title = 'USDC';

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.iconContainer}>
        <LQDImage height={24} width={24} src={tokenIconURL} />
      </View>

      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default PopularAssetCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8 + 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#EAEEF4',
    backgroundColor: '#fff',
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
