import React from 'react';
import { FlatList, View, ActivityIndicator, StyleSheet, ListRenderItem, RefreshControl } from 'react-native';
import { LQDFlatlistProps } from './types';

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
      <ActivityIndicator size="small" color="#4691FE" />
    </View>
  );

  const IsRefresh = () => {
    if (onRefresh) {
      return (
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          progressBackgroundColor="white"
          tintColor="#4691FE"
          titleColor="#4691FE"
        />
      );
    }

    return null;
  };

  return (
    <FlatList
      data={data}
      renderItem={renderItem as ListRenderItem<T>}
      keyExtractor={keyExtractor}
      ListHeaderComponent={ListHeaderComponent}
      ListFooterComponent={loader ? <DefaultFooterLoader /> : ListFooterComponent}
      ListEmptyComponent={ListEmptyComponent}
      refreshing={refreshing}
      refreshControl={<IsRefresh />}
      onRefresh={onRefresh}
      onEndReached={onEndReached}
      onEndReachedThreshold={onEndReachedThreshold}
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      contentContainerStyle={[{ flexGrow: 1, paddingBottom: 100 }, contentContainerStyle]}
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
  loaderContainer: {
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
