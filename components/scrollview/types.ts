import { StyleProp, ViewStyle } from 'react-native';

interface ILQDScrollView {
  children?: React.ReactNode;
  refreshing: boolean;
  onRefresh: () => void;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
}

export type { ILQDScrollView };
