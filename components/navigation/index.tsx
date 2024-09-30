import { useState } from 'react';
import { View, StyleSheet, LayoutChangeEvent } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

import LQDNavigationAction from './action';

const LQDNavigation = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) => {
  const [dimensions, setDimensions] = useState({
    height: 20,
    width: 100,
  });
  const tabPositionX = useSharedValue(0);

  const buttonWidth = dimensions.width / state.routes.length;

  const animatedStyle = useAnimatedStyle(() => {
    let offset = 0;
    if (state.index === 0) offset += 6;
    if (state.index === state.routes.length - 1) offset -= 6;

    return {
      transform: [{ translateX: tabPositionX.value + offset }],
    };
  });

  const onTabLayout = (event: LayoutChangeEvent) => {
    const { height, width } = event.nativeEvent.layout;
    setDimensions({ height, width });
  };

  return (
    <View onLayout={onTabLayout} style={styles.container}>
      <Animated.View
        style={[
          animatedStyle,
          styles.activeIndicator,
          { height: dimensions.height - 30, width: buttonWidth - 25 },
        ]}
      />

      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          tabPositionX.value = withSpring(buttonWidth * index, {
            duration: 1500,
          });
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <LQDNavigationAction
            isFocused={isFocused}
            label={label}
            onPress={onPress}
            onLongPress={onLongPress}
            routeName={route.name}
            key={route.name}
          />
        );
      })}
    </View>
  );
};

export default LQDNavigation;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#EAEEF4',
    paddingTop: 12,
    paddingBottom: 30,
    paddingHorizontal: 8,
  },

  activeIndicator: {
    position: 'absolute',
    top: 6,
    backgroundColor: '#00000080',
    borderRadius: 30,
    marginHorizontal: 12,
  },
});
