import React from 'react';
import { RefreshControl, ScrollView } from 'react-native';
import { ILQDScrollView } from './types';

const LQDScrollView: React.FC<ILQDScrollView> = ({ children, onRefresh, refreshing = false, style, contentStyle }) => {
  const Refresh = () => {
    if (onRefresh) {
      return <RefreshControl refreshing={refreshing || false} onRefresh={onRefresh} progressBackgroundColor="white" />;
    }

    return null;
  };

  return (
    <ScrollView
      style={[style, { flex: 1 }]}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[
        {
          rowGap: 24,
        },
        contentStyle,
      ]}
      refreshControl={<Refresh />}
    >
      {children}
    </ScrollView>
  );
};

export default LQDScrollView;
