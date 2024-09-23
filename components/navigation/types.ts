interface ILQDNavigationAction {
  isFocused: boolean;
  label: string | any;
  onPress: () => void;
  onLongPress: () => void;
  routeName: string;
}
