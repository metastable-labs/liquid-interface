import React from 'react';
import { RefreshControl, ScrollView } from 'react-native';
import { ILQDScrollView } from './types';

const LQDScrollView: React.FC<ILQDScrollView> = ({ children, onRefresh, refreshing, style, contentStyle }) => {
  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          progressBackgroundColor="white"
          tintColor="#4691FE"
          titleColor="#4691FE"
        />
      }
      style={[style, { flex: 1 }]}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[
        {
          rowGap: 24,
        },
        contentStyle,
      ]}
    >
      {children}
    </ScrollView>
  );
};

export default LQDScrollView;
