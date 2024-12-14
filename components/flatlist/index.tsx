import React, { forwardRef } from 'react';
import { FlatList, View, ActivityIndicator, StyleSheet, ListRenderItem, RefreshControl } from 'react-native';
import { LQDFlatlistProps } from './types';

const LQDFlatlist = forwardRef(
  <T,>(
    {
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
      showsHorizontalScrollIndicator = false,
      contentContainerStyle,
      horizontal = false,
      style,
      isFetchingNextPage = false,
    }: LQDFlatlistProps<T>,
    ref: React.Ref<FlatList<T>>
  ) => {
    const DefaultFooterLoader = () => (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="small" color="#4691FE" />
      </View>
    );

    const Refresh = () => {
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
        ref={ref}
        data={data}
        renderItem={renderItem as ListRenderItem<T>}
        keyExtractor={keyExtractor}
        ListHeaderComponent={ListHeaderComponent}
        ListFooterComponent={isFetchingNextPage ? <DefaultFooterLoader /> : ListFooterComponent}
        ListEmptyComponent={ListEmptyComponent}
        refreshing={refreshing}
        refreshControl={<Refresh />}
        onRefresh={onRefresh}
        onEndReached={onEndReached}
        onEndReachedThreshold={onEndReachedThreshold}
        showsVerticalScrollIndicator={showsVerticalScrollIndicator}
        contentContainerStyle={[{ paddingBottom: 100 }, contentContainerStyle]}
        style={[style]}
        horizontal={horizontal}
        showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
      />
    );
  }
);

export default LQDFlatlist;

const styles = StyleSheet.create({
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
