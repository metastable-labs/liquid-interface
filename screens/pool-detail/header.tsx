import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

import { adjustFontSizeForIOS } from '@/utils/helpers';
import { BoxSearchIcon, SendIcon } from '@/assets/icons';

const Header = ({ condition, fee, id, primaryIconURL, primaryTitle, secondaryIconURL, secondaryTitle }: IPool) => {
  const flagColors = {
    stable: '#B47818',
    volatile: '#AF1D38',
  };

  const actions = [
    {
      action: () => console.log('search'),
      icon: <BoxSearchIcon />,
    },
    {
      action: () => console.log('sharing', id),
      icon: <SendIcon />,
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <View style={styles.iconContainer}>
          {[primaryIconURL, secondaryIconURL].map((iconURL, index) => (
            <View key={index} style={[styles.icon, index === 0 && { position: 'relative', zIndex: 1 }]}>
              <Image source={{ uri: iconURL }} style={{ width: 34.9, height: 34.9 }} />
            </View>
          ))}
        </View>

        <View style={styles.detailContainer}>
          <Text style={styles.detailHeader}>
            {condition.charAt(0)}AMM - {primaryTitle} / {secondaryTitle}
          </Text>

          <View style={styles.details}>
            <Text style={[styles.detailText, { color: flagColors[condition], textTransform: 'capitalize' }]}>Basic {condition}</Text>

            <View style={styles.separator}>
              <View style={styles.separatorCircle} />
            </View>

            <Text style={[styles.detailText, { color: '#64748B' }]}>{fee}% Fee</Text>
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
});
