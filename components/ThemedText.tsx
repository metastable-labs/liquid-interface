import { Text, type TextProps, StyleSheet } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';
import { adjustFontSizeForIOS } from '@/utils/helpers';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export function ThemedText({ style, lightColor, darkColor, type = 'default', ...rest }: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <Text
      style={[
        { color },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: adjustFontSizeForIOS(16, 2),
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: adjustFontSizeForIOS(16, 2),
    lineHeight: 24,
    fontWeight: '600',
  },
  title: {
    fontSize: adjustFontSizeForIOS(32, 4),
    fontWeight: 'bold',
    lineHeight: 32,
  },
  subtitle: {
    fontSize: adjustFontSizeForIOS(20, 3),
    fontWeight: 'bold',
  },
  link: {
    lineHeight: adjustFontSizeForIOS(30, 4),
    fontSize: adjustFontSizeForIOS(16, 2),
    color: '#0a7ea4',
  },
});
