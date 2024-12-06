import { adjustFontSizeForIOS } from '@/utils/helpers';
import React, { useState, useCallback, useRef, useMemo } from 'react';
import { StyleSheet, useWindowDimensions, View, Animated, Pressable, Text } from 'react-native';
import { TabView, TabBar, SceneRendererProps, NavigationState } from 'react-native-tab-view';

type Route = {
  key: string;
  title: string;
};

type CustomTabViewProps = {
  routes: Route[];
  renderScene: (props: SceneRendererProps & { route: Route }) => React.ReactNode;
  maxContentWidth?: number;
};

const useCustomTabView = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState<number>(0);

  const renderTabBar = ({
    maxContentWidth = 1140,
    ...props
  }: SceneRendererProps & {
    navigationState: NavigationState<Route>;
    maxContentWidth?: number;
  }) => {
    const indicatorFadeAnim = useRef(new Animated.Value(0)).current;
    const measuredTabWidths = useRef<Record<number, number>>({});
    const [tabsWidth, setTabsWidth] = useState<Record<number, number>>({});

    const handleTabLayout = useCallback(
      (route: Route, navigationState: NavigationState<Route>, layoutWidth: number) => {
        const routeIndex = navigationState.routes.indexOf(route);
        measuredTabWidths.current[routeIndex] = layoutWidth;

        if (navigationState.routes.every((_, i) => typeof measuredTabWidths.current[i] === 'number')) {
          setTabsWidth({ ...measuredTabWidths.current });
        }

        if (routeIndex === navigationState.routes.length - 1) {
          Animated.timing(indicatorFadeAnim, {
            toValue: 1,
            duration: 150,
            useNativeDriver: true,
          }).start();
        }
      },
      [indicatorFadeAnim]
    );

    const calculateTranslateX = useCallback(
      (position: Animated.AnimatedInterpolation<number>, routes: Route[]) => {
        const inputRange = routes.map((_, i) => i);
        const outputRange = routes.map((_, i) => {
          const prevWidths = Object.values(tabsWidth)
            .slice(0, i)
            .reduce((a, b) => a + b, 0);
          return prevWidths + (tabsWidth[i] || 0) / 2 - maxContentWidth / 2;
        });

        return position.interpolate({
          inputRange,
          outputRange,
          extrapolate: 'clamp',
        });
      },
      [tabsWidth, maxContentWidth]
    );

    const calculateWidth = useCallback(
      (position: Animated.AnimatedInterpolation<number>, routes: Route[]) => {
        const inputRange = routes.map((_, i) => i);
        const outputRange = routes.map((_, i) => tabsWidth[i] || 0);

        return position.interpolate({
          inputRange,
          outputRange,
          extrapolate: 'clamp',
        });
      },
      [tabsWidth]
    );

    return (
      <TabBar
        {...props}
        contentContainerStyle={{
          alignItems: 'center',
          justifyContent: 'center',
          width: maxContentWidth,
          alignSelf: 'center',
        }}
        style={[styles.tabBar, { width: '70%', alignSelf: 'center' }]}
        renderIndicator={({ position, navigationState }) => {
          if (Object.keys(tabsWidth).length !== navigationState.routes.length) return null;

          return (
            <Animated.View
              style={[
                styles.indicator,
                {
                  transform: [
                    {
                      translateX: calculateTranslateX(position, navigationState.routes),
                    },
                  ],
                  opacity: indicatorFadeAnim,
                },
              ]}
            />
          );
        }}
        renderTabBarItem={({ route, onPress, onLongPress, onLayout, navigationState }) => {
          const isActive = navigationState.index === navigationState.routes.indexOf(route);
          return (
            <Pressable
              onPress={onPress}
              onLongPress={onLongPress}
              style={[styles.tabItem, isActive && styles.activeTabItem]}
              onLayout={(e) => handleTabLayout(route, navigationState, e.nativeEvent.layout.width)}
            >
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: adjustFontSizeForIOS(14, 1),
                  fontFamily: 'Aeonik',
                  fontWeight: '500',
                  color: isActive ? '#020617' : '#475569',
                }}
              >
                {route.title}
              </Text>
            </Pressable>
          );
        }}
      />
    );
  };

  const CustomTabView: React.FC<CustomTabViewProps> = ({ renderScene, routes, maxContentWidth }) => (
    <View style={{ flex: 1 }}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={(props) => renderTabBar({ ...props, maxContentWidth })}
        initialLayout={{ width: layout.width }}
      />
    </View>
  );

  return { CustomTabView };
};

const styles = StyleSheet.create({
  tabBar: {
    position: 'relative',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: 'lightgray',
    elevation: 0,
    shadowOpacity: 0,
    marginBottom: 16,
  },
  indicator: {
    position: 'absolute',
    height: 2,
    backgroundColor: 'blue',
    bottom: 0,
  },
  tabItem: {
    paddingBottom: 12,
    paddingTop: 16,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    marginHorizontal: 23,
    padding: 0,
  },
  activeTabItem: {
    borderBottomColor: '#4691FE', // Active tab border color
  },
  indicatorContainer: {
    zIndex: 1,
  },
  tabStyle: {
    width: 'auto',
  },
});

export default useCustomTabView;
