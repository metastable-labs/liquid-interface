import { View, Text, StyleSheet } from 'react-native';

import { adjustFontSizeForIOS } from '@/utils/helpers';
import { LQDTokenImage } from '@/components';

const AssetPaper = ({ iconUrl, name, usdValue, value }: IAssetPaper) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <LQDTokenImage iconURL={iconUrl} />

        <View style={styles.nameAndValueContainer}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.value}>
            {value.toLocaleString()} {name}
          </Text>
        </View>
      </View>

      <Text style={styles.usdValue}>${usdValue.toLocaleString()}</Text>
    </View>
  );
};

export default AssetPaper;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 2,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
  },

  leftContainer: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  nameAndValueContainer: {
    justifyContent: 'center',
    gap: 4,
  },

  name: {
    color: '#1E293B',
    fontSize: adjustFontSizeForIOS(14, 2),
    lineHeight: 18.48,
    fontWeight: '500',
    fontFamily: 'AeonikMedium',
  },

  value: {
    color: '#64748B',
    fontSize: adjustFontSizeForIOS(11, 2),
    lineHeight: 13.64,
    fontFamily: 'AeonikRegular',
  },

  usdValue: {
    color: '#475569',
    fontSize: adjustFontSizeForIOS(13, 2),
    lineHeight: 16.12,
    fontWeight: '500',
    fontFamily: 'AeonikMedium',
  },
});
