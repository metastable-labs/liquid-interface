import { useEffect } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

const icon: any = {
  home: (props: any) => <Ionicons name="home" {...props} />,
  discover: (props: any) => <Ionicons name="diamond-sharp" {...props} />,
  holdings: (props: any) => <Ionicons name="briefcase" {...props} />,
};

const LQDNavigationAction = ({
  isFocused,
  label,
  onLongPress,
  onPress,
  routeName,
}: ILQDNavigationAction) => {
  const colorValue = useSharedValue(isFocused ? 1 : 0);

  useEffect(() => {
    colorValue.value = withTiming(isFocused ? 1 : 0, { duration: 300 });
  }, [isFocused]);

  const animatedTextStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      colorValue.value,
      [0, 1],
      ['#64748B', '#020617']
    );
    return {
      color,
    };
  });

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.container}
    >
      {icon?.[routeName]?.({
        color: isFocused ? '#020617' : '#64748B',
        size: 24,
      })}

      <Animated.Text
        style={[
          animatedTextStyle,
          styles.text,
          isFocused && { fontWeight: '700' },
        ]}
      >
        {label}
      </Animated.Text>
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
    fontSize: 11,
    lineHeight: 13.64,
  },
});
