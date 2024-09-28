import React from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';

import { ILQDPressAnimation } from './types';

const LQDPressAnimation = ({
  children,
  disabled,
  onPress,
  style,
}: ILQDPressAnimation) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePressIn = () => {
    scale.value = withSpring(0.9);

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
    onPress && onPress();
  };

  return (
    <Animated.View
      onTouchStart={handlePressIn}
      onTouchEnd={handlePressOut}
      style={[
        animatedStyle,
        disabled && { opacity: 0.5, pointerEvents: 'none' },
        style,
      ]}
    >
      {children}
    </Animated.View>
  );
};

export default LQDPressAnimation;
