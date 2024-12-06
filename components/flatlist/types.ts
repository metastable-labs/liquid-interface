import { FlatListProps } from 'react-native';

export interface LQDFlatlistProps<T> extends FlatListProps<T> {
  loader?: boolean;
  ListEmptyComponent?: React.ComponentType<any> | React.ReactElement | null;
  ListFooterComponent?: React.ComponentType<any> | React.ReactElement | null;
  refreshing?: boolean;
  onRefresh?: () => void;
}
