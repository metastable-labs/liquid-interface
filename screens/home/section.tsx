import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Section = ({ children, icon, subtitle, title, action, isShowingAll }: ISection) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.detail}>
          {icon}
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>

        {!isShowingAll && (
          <TouchableOpacity onPress={action} style={styles.action}>
            <Text style={styles.actionText}>See all</Text>
            <Ionicons name="chevron-forward" size={16} color="#0C0507" />
          </TouchableOpacity>
        )}
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
    fontSize: 20,
    lineHeight: 23.2,
    fontWeight: '500',
    fontFamily: 'AeonikMedium',
  },

  subtitle: {
    color: '#94A3B8',
    fontSize: 12,
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
    fontSize: 13,
    lineHeight: 16.12,
    fontFamily: 'AeonikRegular',
  },
});
