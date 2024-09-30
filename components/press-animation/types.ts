import { StyleProp, ViewStyle } from 'react-native';

export interface ILQDPressAnimation {
  children: React.ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
}
