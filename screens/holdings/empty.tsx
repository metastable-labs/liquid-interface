import { StyleSheet, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { LQDPressAnimation } from '@/components';

const icons = {
  wallet: <Ionicons name="wallet-outline" size={24} color="#FFF" />,
  radio: <Ionicons name="radio-outline" size={24} color="#FFF" />,
  coins: <Ionicons name="contract-outline" size={24} color="#FFF" />,
  dollar: <Ionicons name="logo-usd" size={24} color="#FFF" />,
};

const actionIcons = {
  plus: <Ionicons name="add-outline" size={14} color="#FFF" />,
  'right-caret': (
    <Ionicons name="chevron-forward-outline" size={14} color="#FFF" />
  ),
};

const Empty = ({
  icon,
  subtitle,
  title,
  action,
  actionIcon,
  isLast,
}: IEmpty) => {
  return (
    <View style={[styles.container, !isLast && styles.notLastStyle]}>
      <View style={styles.iconContainer}>{icons[icon]}</View>

      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtile}>{subtitle}</Text>
      </View>

      {action && (
        <LQDPressAnimation onPress={action.onPress} style={styles.action}>
          <Text style={styles.actionText}>{action.title}</Text>
          {actionIcon && actionIcons[actionIcon]}
        </LQDPressAnimation>
      )}
    </View>
  );
};

export default Empty;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
    alignSelf: 'stretch',
    gap: 20,
  },

  iconContainer: {
    padding: 8,
    width: 40,
    height: 40,
    backgroundColor: '#334155',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  textContainer: {
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },

  title: {
    color: '#334155',
    fontSize: 16,
    lineHeight: 19.2,
    fontWeight: '500',
  },

  subtile: {
    color: '#64748B',
    fontSize: 14,
    lineHeight: 18.48,
    textAlign: 'center',
  },

  action: {
    flexDirection: 'row',
    width: 105,
    height: 32,
    paddingVertical: 4,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    backgroundColor: '#334155',
    borderRadius: 6,
  },

  actionText: {
    color: '#FFF',
    fontSize: 11,
    lineHeight: 13.64,
    fontWeight: '500',
    textAlign: 'center',
  },

  notLastStyle: {
    borderBottomWidth: 1,
    borderBottomColor: '#EAEEF4',
    paddingBottom: 50,
  },
});
