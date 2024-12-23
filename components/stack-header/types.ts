import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { StyleProp, ViewStyle } from 'react-native';

interface ILQDStackHeader extends NativeStackHeaderProps {
  style?: StyleProp<ViewStyle>;
  hasTitle?: boolean;
  leftIcon?: '' | 'close' | 'back';
  rightIcon?: '' | 'bulb';
}

export type { ILQDStackHeader };
