import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';

import { adjustFontSizeForIOS } from '@/utils/helpers';
import { BoxSearchIcon, SendIcon } from '@/assets/icons';

const Header = ({ condition, poolFee, tokenAIconURL, symbol, tokenBIconURL }: PoolDetails) => {
  const flagColors = {
    stable: '#156146',
    volatile: '#B47818',
  };

  const actions = [
    {
      action: () => console.log('search'),
      icon: <BoxSearchIcon />,
    },
    {
      action: () => console.log('sharing', symbol),
      icon: <SendIcon />,
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <View style={styles.iconContainer}>
          {[tokenAIconURL, tokenBIconURL].map((iconURL, index) => (
            <View key={index} style={[styles.icon, index === 0 && { position: 'relative', zIndex: 1 }]}>
              <FastImage
                source={{ uri: iconURL, priority: FastImage.priority.high }}
                style={styles.image}
                resizeMode={FastImage.resizeMode.contain}
              />
            </View>
          ))}
        </View>

        <View style={styles.detailContainer}>
          <Text style={styles.detailHeader}>{symbol}</Text>

          <View style={styles.details}>
            <Text style={[styles.detailText, { color: flagColors[condition], textTransform: 'capitalize' }]}>Basic {condition}</Text>

            <View style={styles.separator}>
              <View style={styles.separatorCircle} />
            </View>

            <Text style={[styles.detailText, { color: '#64748B' }]}>{poolFee}% Fee</Text>
          </View>
        </View>
      </View>

      <View style={styles.actions}>
        {actions.map(({ action, icon }, index) => (
          <TouchableOpacity style={styles.action} key={index} onPress={action}>
            {icon}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 2,
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
  },

  leftContainer: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
    gap: 10 + 5,
  },

  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  icon: {
    width: 34.9,
    height: 34.9,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: '#EAEEF4',
    marginRight: -5,
  },

  detailContainer: {
    justifyContent: 'center',
    gap: 4,
  },

  detailHeader: {
    color: '#1E293B',
    fontSize: adjustFontSizeForIOS(14, 2),
    lineHeight: 18.48,
    fontWeight: '500',
    fontFamily: 'AeonikMedium',
  },

  details: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
    gap: 4,
  },

  detailText: {
    fontSize: adjustFontSizeForIOS(11, 2),
    lineHeight: 13.64,
    fontFamily: 'AeonikRegular',
  },

  fee: {
    color: '#64748B',
    fontFamily: 'AeonikRegular',
  },

  separator: {
    position: 'relative',
    width: 7,
    height: 0.5,
    backgroundColor: '#0C050766',
  },

  separatorCircle: {
    width: 3,
    height: 3,
    borderRadius: 9999,
    backgroundColor: '#0C0507',
    position: 'absolute',
    top: -1.35,
    left: '26%',
  },

  actions: {
    padding: 2,
    alignItems: 'center',
    gap: 24,
    borderRadius: 90,
    backgroundColor: 'rgab(255, 255, 255, 0.1)',
    flexDirection: 'row',
  },

  action: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },

  image: {
    width: 34.9,
    height: 34.9,
    borderRadius: 34,
  },
});
