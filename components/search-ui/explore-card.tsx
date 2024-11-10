import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';

import useSystemFunctions from '@/hooks/useSystemFunctions';
import { adjustFontSizeForIOS } from '@/utils/helpers';
import useAppActions from '@/store/app/actions';
import { ChartSquareIcon, DollarCoinSMIcon, FavoriteChartIcon } from '@/assets/icons';

const config = {
  primary: {
    iconContainerColor: '#5A36BF',
    icon: <DollarCoinSMIcon />,
  },
  secondary: {
    iconContainerColor: '#375DFB',
    icon: <FavoriteChartIcon />,
  },
  tertiary: {
    iconContainerColor: '#1F87AD',
    icon: <ChartSquareIcon />,
  },
};

const ExploreCard = ({ id, title, variant }: IExploreCard) => {
  const { router, pathname } = useSystemFunctions();
  const { searchIsFocused } = useAppActions();
  const onPress = () => {
    searchIsFocused(false);
    // router.push(`/(tabs)/home/${id}`);
  };

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={[styles.iconContainer, { backgroundColor: config[variant].iconContainerColor }]}>{config[variant].icon}</View>

      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ExploreCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#EAEEF4',
    backgroundColor: '#fff',
  },

  iconContainer: {
    padding: 4.8,
    alignItems: 'center',
    justifyContent: 'center',
    width: 24,
    height: 24,
    borderRadius: 7.2,
  },

  text: {
    color: '#1E293B',
    fontSize: adjustFontSizeForIOS(14, 2),
    lineHeight: 18.48,
    fontWeight: '500',
    fontFamily: 'AeonikMedium',
  },
});
