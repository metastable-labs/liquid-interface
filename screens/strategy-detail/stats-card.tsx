import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { CuratorIcon, DepositIcon, LockedIcon, RiskIcon, StatsDepositIcon } from '@/assets/icons';
import { adjustFontSizeForIOS } from '@/utils/helpers';

const StatsCard = ({ title, value, variant, isActive = false }: IStatCard) => {
  const icon = {
    locked: <LockedIcon />,
    risk: <RiskIcon fill="#156146" />,
    deposit: <StatsDepositIcon />,
    curator: <CuratorIcon />,
  };

  const backgroundColor = isActive ? '#EFFAF6' : '#F8FAFC';
  const borderColor = isActive ? '#CBF5E5' : '#F1F5F9';
  const textColor = isActive ? '#013220' : '#121212';

  return (
    <View style={[styles.container, { backgroundColor, borderColor }]}>
      {icon[variant]}
      <View>
        <Text style={[styles.subTitle, { color: textColor }]}>{title}</Text>
        <Text style={[styles.title, { color: textColor }]}>{value}</Text>
      </View>
    </View>
  );
};

export default StatsCard;

const styles = StyleSheet.create({
  container: {
    width: '47%',
    borderWidth: 1,
    borderRadius: 20,
    padding: 15,
    rowGap: 15,
  },
  title: {
    fontSize: adjustFontSizeForIOS(28, 2),
    fontWeight: '700',
    color: '#1A2001',
    lineHeight: 31.36,
    fontFamily: 'QuantaGroteskProSemiBold',
    marginTop: 10,
  },
  subTitle: {
    fontSize: adjustFontSizeForIOS(13, 2),
    fontWeight: '400',
    color: '#1A2001',
    lineHeight: 18.48,
    fontFamily: 'AeonikRegular',
  },
});
