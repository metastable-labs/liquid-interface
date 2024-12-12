import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { adjustFontSizeForIOS } from '@/utils/helpers';
import { LQDImage } from '@/components';

const AssetItem = ({ title, subTitle, icon }: IAssetItem) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <LQDImage height={24} width={24} />
        <View style={styles.detailContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subTitle}>{subTitle}</Text>
        </View>
      </View>
    </View>
  );
};

export default AssetItem;

const styles = StyleSheet.create({
  detailContainer: {
    justifyContent: 'center',
    gap: 4,
  },

  title: {
    color: '#1E293B',
    fontSize: adjustFontSizeForIOS(14, 2),

    fontFamily: 'AeonikMedium',
  },

  details: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
    gap: 4,
  },

  subTitle: {
    color: '#64748B',
    fontSize: adjustFontSizeForIOS(11, 2),
    lineHeight: 13.64,
    fontFamily: 'AeonikRegular',
  },

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
    gap: 10,
    maxWidth: '70%',
  },
});
