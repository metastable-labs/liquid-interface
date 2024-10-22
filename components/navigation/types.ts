import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

interface ILQDNavigationAction {
  isFocused: boolean;
  label: string | any;
  onPress: () => void;
  onLongPress: () => void;
  routeName: string;
}

interface ILQDNavigation extends BottomTabBarProps {
  hide?: boolean;
}

export type { ILQDNavigationAction, ILQDNavigation };
