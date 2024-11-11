import { View, StyleSheet, Text, Image } from 'react-native';

import { adjustFontSizeForIOS } from '@/utils/helpers';

const Balance = ({ tokenABalance, tokenAIconURL, tokenATitle, tokenBBalance, tokenBIconURL, tokenBTitle }: any) => {
  const values = [
    {
      iconURL: tokenAIconURL,
      title: `${tokenABalance.toLocaleString()} ${tokenATitle}`,
    },
    {
      iconURL: tokenBIconURL,
      title: `${tokenBBalance.toLocaleString()} ${tokenBTitle}`,
    },
  ];

  const sections = [
    {
      title: 'Value',
      children: (
        <View style={styles.value}>
          {values.map(({ iconURL, title }, index) => (
            <View key={index} style={styles.valueDetail}>
              <View style={styles.icon}>
                <Image source={{ uri: iconURL }} style={{ width: 18, height: 18 }} />
              </View>

              <Text style={styles.title}>{title}</Text>
            </View>
          ))}
        </View>
      ),
    },
  ];

  return (
    <View style={styles.root}>
      <Text style={styles.title}>Your balance</Text>

      <View style={styles.sectionContainer}>
        {sections.map(({ title, children }, index) => (
          <View key={index} style={styles.section}>
            <Text style={styles.sectionTitle}>{title}</Text>
            {children}
          </View>
        ))}
      </View>
    </View>
  );
};

export default Balance;

const styles = StyleSheet.create({
  root: {
    width: '100%',
    alignSelf: 'stretch',
    paddingBottom: 24,
    gap: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#EAEEF4',
  },

  title: {
    color: '#1A2001',
    fontSize: adjustFontSizeForIOS(16, 2),
    lineHeight: 19.2,
    fontWeight: '500',
    fontFamily: 'AeonikMedium',
  },

  icon: {
    width: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9999,
    borderWidth: 0.75,
    borderColor: '#EAEEF4',
  },

  sectionContainer: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    gap: 80,
  },

  section: {
    gap: 8,
  },

  sectionTitle: {
    color: '#64748B',
    fontSize: adjustFontSizeForIOS(15, 2),
    lineHeight: 19.8,
    fontFamily: 'AeonikRegular',
  },

  value: {
    gap: 12,
  },

  valueDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
});
