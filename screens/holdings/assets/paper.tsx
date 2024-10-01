import { View, Text, StyleSheet, Image } from 'react-native';

const AssetPaper = ({ iconUrl, name, usdValue, value }: IAssetPaper) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <View style={styles.iconWrapper}>
          <Image source={{ uri: iconUrl }} style={{ width: 24, height: 24 }} />
        </View>

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

  iconWrapper: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: '#EAEEF4',
  },

  nameAndValueContainer: {
    justifyContent: 'center',
    gap: 4,
  },

  name: {
    color: '#1E293B',
    fontSize: 14,
    lineHeight: 18.48,
    fontWeight: '500',
  },

  value: {
    color: '#64748B',
    fontSize: 11,
    lineHeight: 13.64,
  },

  usdValue: {
    color: '#475569',
    fontSize: 13,
    lineHeight: 16.12,
    fontWeight: '500',
  },
});
