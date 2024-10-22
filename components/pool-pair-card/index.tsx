import { Image, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import useSystemFunctions from '@/hooks/useSystemFunctions';
import { adjustFontSizeForIOS } from '@/utils/helpers';
import { ArrowDownIcon, ArrowUpAltIcon } from '@/assets/icons';

const backgroundColors = ['#FDEAEA', '#EFFAF6'];
const textColors = ['#A4262C', '#156146'];

const LQDPoolPairCard = ({ change, id, increased, primaryIconURL, primaryTitle, secondaryIconURL, secondaryTitle }: ILQDPoolPairCard) => {
  const { router } = useSystemFunctions();

  const handlePress = () => router.push(`/(tabs)/${id}`);

  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.iconContainer}>
          {[primaryIconURL, secondaryIconURL].map((iconURL, index) => (
            <View key={index} style={[styles.icon, index === 0 && { position: 'relative', zIndex: 1 }]}>
              <Image source={{ uri: iconURL }} style={{ width: 24, height: 24 }} />
            </View>
          ))}
        </View>

        <View style={[styles.changeContainer, { backgroundColor: backgroundColors[+increased] }]}>
          {increased ? (
            <ArrowUpAltIcon width={12} height={12} fill={textColors[+increased]} />
          ) : (
            <ArrowDownIcon width={12} height={12} fill={textColors[+increased]} />
          )}
          <Text style={[styles.change, { color: textColors[+increased] }]}>{change}%</Text>
        </View>
      </View>

      <Text style={styles.title}>
        {primaryTitle} / {secondaryTitle}
      </Text>
    </TouchableOpacity>
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

  title: {
    color: '#1E293B',
    fontSize: adjustFontSizeForIOS(15, 2),
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
});
