import React, { ReactNode } from 'react';
import { FlatList, FlatListProps, Text, View, ActivityIndicator, StyleSheet, ListRenderItem } from 'react-native';

interface LQDFlatlistProps<T> extends FlatListProps<T> {
  loader?: boolean;
  ListEmptyComponent?: ReactNode;
  ListFooterComponent?: ReactNode;
}

const LQDFlatlist = <T,>({
  data = [],
  renderItem,
  keyExtractor = (item, index) => index.toString(),
  ListHeaderComponent,
  ListFooterComponent,
  ListEmptyComponent,
  refreshing = false,
  onRefresh,
  onEndReached,
  onEndReachedThreshold = 0.1,
  showsVerticalScrollIndicator = false,
  contentContainerStyle,
  style,
  loader = false,
}: LQDFlatlistProps<T>) => {
  const DefaultFooterLoader = () => (
    <View style={styles.loaderContainer}>
      <ActivityIndicator size="small" color="#09C37F" />
    </View>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem as ListRenderItem<T>} // Explicitly typing the renderItem function
      keyExtractor={keyExtractor}
      ListHeaderComponent={ListHeaderComponent}
      ListFooterComponent={loader ? <DefaultFooterLoader /> : ListFooterComponent}
      ListEmptyComponent={ListEmptyComponent}
      refreshing={refreshing}
      onRefresh={onRefresh}
      onEndReached={onEndReached}
      onEndReachedThreshold={onEndReachedThreshold}
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      contentContainerStyle={[{ flexGrow: 1, paddingBottom: loader ? 16 : 0 }, contentContainerStyle]}
      style={[styles.list, style]}
    />
  );
};

export default LQDFlatlist;

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
  },
  loaderContainer: {
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
