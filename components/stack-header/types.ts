import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { StyleProp, ViewStyle } from 'react-native';

interface ILQDStackHeader extends NativeStackHeaderProps {
  style?: StyleProp<ViewStyle>;
  hasTitle?: boolean;
}

export type { ILQDStackHeader };
