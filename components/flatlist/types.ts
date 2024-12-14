import { FlatList, FlatListProps } from 'react-native';

export interface LQDFlatlistProps<T> extends FlatListProps<T> {
  isFetchingNextPage?: boolean;
  horizontal?: boolean;
  ListEmptyComponent?: React.ComponentType<any> | React.ReactElement | null;
  ListFooterComponent?: React.ComponentType<any> | React.ReactElement | null;
  refreshing?: boolean;
  onRefresh?: () => void;
}
