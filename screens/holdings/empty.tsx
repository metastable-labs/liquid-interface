import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import { adjustFontSizeForIOS } from '@/utils/helpers';
import { AddIcon, CaretRightAltIcon, CoinsAltIcon, DollarSquareIcon, MoneysIcon, WalletMoneyIcon } from '@/assets/icons';

const icons = {
  wallet: <WalletMoneyIcon fill="#FFFFFF" />,
  radio: <MoneysIcon />,
  coins: <CoinsAltIcon fill="#FFF" />,
  dollar: <DollarSquareIcon fill="#FFFFFF" />,
};

const actionIcons = {
  plus: <AddIcon />,
  'right-caret': <CaretRightAltIcon fill="#fff" />,
};

const Empty = ({ icon, subtitle, title, action, actionIcon, isLast }: IEmpty) => {
  return (
    <View style={[styles.container, !isLast && styles.notLastStyle]}>
      <View style={styles.iconContainer}>{icons[icon]}</View>

      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtile}>{subtitle}</Text>
      </View>

      {action && (
        <TouchableOpacity onPress={action.onPress} style={styles.action}>
          <Text style={styles.actionText}>{action.title}</Text>
          {actionIcon && actionIcons[actionIcon]}
        </TouchableOpacity>
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
    fontSize: adjustFontSizeForIOS(16, 2),
    lineHeight: 19.2,
    fontWeight: '500',
  },

  subtile: {
    color: '#64748B',
    fontSize: adjustFontSizeForIOS(14, 2),
    lineHeight: 18.48,
    textAlign: 'center',
  },

  action: {
    flexDirection: 'row',
    height: 32,
    paddingVertical: 4,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    backgroundColor: '#334155',
    borderRadius: 6,
  },

  actionText: {
    color: '#FFF',
    fontSize: adjustFontSizeForIOS(11, 2),
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
