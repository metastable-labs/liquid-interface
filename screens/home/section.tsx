import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { adjustFontSizeForIOS } from '@/utils/helpers';
import { CaretRightAltIcon } from '@/assets/icons';

const Section = ({ children, icon, subtitle, title, action, isShowingAll }: ISection) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.detail}>
          {icon}
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>

        <TouchableOpacity onPress={action} style={styles.action}>
          <Text style={styles.actionText}>See all</Text>
          <CaretRightAltIcon />
        </TouchableOpacity>
      </View>

      {children}
    </View>
  );
};

export default Section;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    gap: 20,
  },

  header: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  detail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  title: {
    color: '#0F172A',
    fontSize: adjustFontSizeForIOS(20, 3),
    lineHeight: 23.2,
    fontWeight: '500',
    fontFamily: 'AeonikMedium',
  },

  subtitle: {
    color: '#94A3B8',
    fontSize: adjustFontSizeForIOS(12, 2),
    lineHeight: 14.4,
    fontWeight: '500',
    fontFamily: 'ClashDisplayMedium',
  },

  action: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  actionText: {
    color: '#1E293B',
    fontSize: adjustFontSizeForIOS(13, 2),
    lineHeight: 16.12,
    fontFamily: 'AeonikRegular',
  },
});
