import { StyleProp, ViewStyle } from 'react-native';

interface ILQDButton {
  title: string;
  onPress?: () => void;
  onLongPress?: () => void;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'tertiaryOutline';
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  fullWidth?: boolean;
  icon?: 'money' | 'arrow-up';
}

export type { ILQDButton };
