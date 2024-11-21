import { useEffect } from 'react';
import { Animated, Easing } from 'react-native';
import { ILQShrimeLoader } from './types';

const LQShrimeLoader = ({ style, bg = '#EAEEF4' }: ILQShrimeLoader) => {
  const animatedOpacity = new Animated.Value(0);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedOpacity, {
          toValue: 1,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(animatedOpacity, {
          toValue: 0,
          duration: 1800,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    ).start();
  });

  const opacity = animatedOpacity.interpolate({
    inputRange: [0, 1],
    outputRange: [0.4, 1],
  });

  return <Animated.View style={[style, { backgroundColor: bg, opacity }]} />;
};

export default LQShrimeLoader;
