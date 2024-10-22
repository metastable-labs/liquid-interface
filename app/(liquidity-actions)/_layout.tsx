import { useCallback, useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import useAppActions from '@/store/app/actions';

const LiquidityActionsStack = () => {
  const { hideSearch } = useAppActions();

  useEffect(() => hideSearch(true), []);
  return (
    <>
      <StatusBar style="inverted" />

      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="add" />
        <Stack.Screen name="remove" />
      </Stack>
    </>
  );
};

export default LiquidityActionsStack;
