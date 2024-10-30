import { PropsWithChildren, useMemo } from 'react';
import { useColorScheme } from 'react-native';
import { DarkTheme, DefaultTheme, ThemeProvider as ThemeProviderBase } from '@react-navigation/native';

export function ThemeProvider({ children }: PropsWithChildren) {
  const colorScheme = useColorScheme();
  const theme = useMemo(() => (colorScheme === 'dark' ? DarkTheme : DefaultTheme), [colorScheme]);

  return <ThemeProviderBase value={theme}>{children}</ThemeProviderBase>;
}
