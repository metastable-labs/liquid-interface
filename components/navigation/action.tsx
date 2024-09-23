import { useEffect } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

const icon: any = {
  index: (props: any) => <Ionicons name="home" {...props} />,
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
  const scale = useSharedValue(0);

  const animatedIconStyle = useAnimatedStyle(() => {
    const scaleValue = interpolate(scale.value, [0, 1], [1, 1.2]);

    const top = interpolate(scale.value, [0, 1], [0, 9]);

    return {
      transform: [{ scale: scaleValue }],
      top,
    };
  });

  const animatedTextStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scale.value, [0, 1], [1, 0]);

    return {
      opacity,
    };
  });

  useEffect(() => {
    scale.value = withSpring(
      typeof isFocused === 'boolean' ? (isFocused ? 1 : 0) : isFocused,
      {
        duration: 350,
      }
    );
  }, [isFocused, scale]);
  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.container}
    >
      <Animated.View style={animatedIconStyle}>
        {icon[routeName]({
          color: isFocused ? '#FFF' : '#222',
          size: 24,
        })}
      </Animated.View>
      <Animated.Text
        style={[
          { color: isFocused ? '#FFF' : '#222', fontSize: 12 },
          animatedTextStyle,
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
});
