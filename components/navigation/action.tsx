import { useEffect } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated, { interpolateColor, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { adjustFontSizeForIOS } from '@/utils/helpers';
import { HomeIcon, WalletIcon } from '@/assets/icons';
import { ILQDNavigationAction } from './types';

const icon: any = {
  home: (props: any) => <HomeIcon {...props} />,
  holdings: (props: any) => <WalletIcon {...props} />,
};

const LQDNavigationAction = ({ isFocused, label, onLongPress, onPress, routeName }: ILQDNavigationAction) => {
  const colorValue = useSharedValue(isFocused ? 1 : 0);

  useEffect(() => {
    colorValue.value = withTiming(isFocused ? 1 : 0, { duration: 300 });
  }, [isFocused]);

  const animatedTextStyle = useAnimatedStyle(() => {
    const color = interpolateColor(colorValue.value, [0, 1], ['#64748B', '#020617']);
    return {
      color,
    };
  });

  return (
    <Pressable onPress={onPress} onLongPress={onLongPress} style={styles.container}>
      {icon?.[routeName]?.({
        fill: isFocused ? '#020617' : '#64748B',
        width: 24,
        height: 24,
      })}

      <Animated.Text style={[animatedTextStyle, styles.text, isFocused && { fontWeight: '700' }]}>{label}</Animated.Text>
    </Pressable>
  );
};

export default LQDNavigationAction;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },

  text: {
    fontSize: adjustFontSizeForIOS(11, 2),
    lineHeight: 13.64,
  },
});
