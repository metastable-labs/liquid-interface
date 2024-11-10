import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';

import useSystemFunctions from '@/hooks/useSystemFunctions';
import { adjustFontSizeForIOS } from '@/utils/helpers';
import useAppActions from '@/store/app/actions';

const RecentCard = ({ id, primaryIconURL, primaryTitle, secondaryIconURL, secondaryTitle }: IRecentCard) => {
  const { router, pathname } = useSystemFunctions();
  const { searchIsFocused } = useAppActions();
  const onPress = () => {
    searchIsFocused(false);
    router.push(`/(tabs)/home/${id}`);
  };

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.iconContainer}>
        {[primaryIconURL, secondaryIconURL].map((iconURL, index) => (
          <View key={index} style={[styles.icon, index === 0 && { position: 'relative', zIndex: 1 }]}>
            <Image source={{ uri: iconURL }} style={{ width: 24, height: 24 }} />
          </View>
        ))}
      </View>

      <Text style={styles.text}>
        {primaryTitle} / {secondaryTitle}
      </Text>
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
