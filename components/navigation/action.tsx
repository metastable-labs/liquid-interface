import { useEffect } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import Animated, { interpolateColor, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { adjustFontSizeForIOS } from '@/utils/helpers';
import { DiscordTabIcon, HomeIcon } from '@/assets/icons';
import FastImage from 'react-native-fast-image';

const image = 'https://pics.craiyon.com/2023-08-02/7a951cac85bd4aa2b0e70dbaabb8404e.webp';

const icon: any = {
  home: (props: any) => <HomeIcon {...props} />,
  discover: (props: any) => <DiscordTabIcon {...props} />,
  profile: (props: any) => <FastImage style={[styles.image, { borderWidth: props.focus ? 1 : 0 }]} source={{ uri: image }} />,
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
        focus: isFocused,
      })}

      {label && <Animated.Text style={[animatedTextStyle, styles.text, isFocused && { fontWeight: '700' }]}>{label}</Animated.Text>}
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
    paddingVertical: 8,
  },

  text: {
    fontSize: adjustFontSizeForIOS(11, 2),
    lineHeight: 13.64,
  },

  image: {
    width: 24,
    height: 24,
    borderRadius: 100,
    borderColor: '#000',
  },
});
