import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

import LQDNavigationAction from './action';
import { ILQDNavigation } from './types';

const LQDNavigation = ({ descriptors, navigation, state, hide }: ILQDNavigation) => {
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  useEffect(() => {
    opacity.value = withSpring(hide ? 0 : 1, {
      damping: 20,
      stiffness: 90,
    });
  }, [hide]);

  const filteredRoutes = state.routes.filter((route) => {
    const isPoolRoute = route.name.startsWith('pool') || route.name.includes('[poolId]');
    return route.name !== 'search' && !isPoolRoute;
  });

  return (
    <Animated.View style={[styles.container, animatedStyle, hide && { pointerEvents: 'none' }]}>
      {filteredRoutes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel !== undefined ? options.tabBarLabel : options.title !== undefined ? options.title : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
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
    </Animated.View>
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
});
