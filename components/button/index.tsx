import { View, StyleSheet, Text, TouchableOpacity, ActivityIndicator } from 'react-native';

import { ArrowUpIcon, DollarCoinIcon } from '@/assets/icons';
import { adjustFontSizeForIOS } from '@/utils/helpers';
import { ILQDButton } from './types';

const icons = {
  money: (color?: string) => <DollarCoinIcon width={18} height={18} fill={color || '#FFF'} />,
  'arrow-up': (color?: string) => <ArrowUpIcon width={18} height={18} fill={color || '#334155'} />,
};

const LQDButton = ({
  onPress,
  title,
  variant = 'primary',
  disabled,
  loading,
  style,
  fullWidth = true,
  icon,
  iconColor,
  onLongPress,
}: ILQDButton) => {
  return (
    <TouchableOpacity onPress={onPress} onLongPress={onLongPress} style={style} disabled={disabled || loading}>
      <View
        style={[
          styles.container,
          styles[`${variant}Container`],
          (styles as any)[`${variant}Shadow`],
          fullWidth && { width: '100%' },
          icon && { gap: 5 },
          disabled || loading ? styles.disabledStyle : null,
        ]}
      >
        {loading && <ActivityIndicator color="#000" />}
        {!loading && <Text style={styles[`${variant}Text`]}>{title}</Text>}
        {icon && icons[icon](iconColor)}
      </View>
    </TouchableOpacity>
  );
};

export default LQDButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  primaryContainer: {
    paddingTop: 19,
    paddingBottom: 18,
    borderRadius: 50,
    backgroundColor: '#F1F5F9',
  },

  primaryText: {
    fontSize: adjustFontSizeForIOS(16, 2),
    lineHeight: 16,
    color: '#1A2001',
    fontFamily: 'QuantaGroteskProSemiBold',
    fontWeight: '600',
  },

  primaryShadow: {
    shadowColor: 'rgba(62, 62, 62, 0.04)',
    shadowOffset: { width: 0, height: -2.4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 1,
    borderColor: '#EBEBEB',
  },

  secondaryContainer: {
    paddingVertical: 17,
    borderRadius: 50,
    backgroundColor: '#4691FE',
  },

  secondaryText: {
    fontSize: adjustFontSizeForIOS(16, 2),
    lineHeight: 16,
    color: '#FFF',
    fontFamily: 'QuantaGroteskProSemiBold',
    fontWeight: '600',
  },

  lightContainer: {
    paddingVertical: 17,
    borderRadius: 50,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },

  lightText: {
    fontSize: adjustFontSizeForIOS(16, 2),
    lineHeight: 16,
    color: '#1E293B',
    fontFamily: 'QuantaGroteskProSemiBold',
    fontWeight: '600',
  },

  tertiaryContainer: {
    height: 40,
    paddingVertical: 5,
    paddingHorizontal: 16,
    backgroundColor: '#4691FE',
    borderRadius: 16,
  },
  tertiaryText: {
    color: '#FFF',
    fontSize: adjustFontSizeForIOS(12, 2),
    lineHeight: 15.84,
    fontWeight: '500',
    fontFamily: 'AeonikMedium',
  },

  tertiaryOutlineContainer: {
    height: 40,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 16,
  },
  tertiaryOutlineText: {
    color: '#334155',
    fontSize: adjustFontSizeForIOS(13, 2),
    lineHeight: 16.12,
    fontWeight: '500',
    fontFamily: 'AeonikMedium',
  },

  disabledStyle: {
    opacity: 0.5,
  },
});
