import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const LiquidityActionsStack = () => {
  return (
    <>
      <StatusBar style="light" />

      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="add" />
        <Stack.Screen name="remove" />
      </Stack>
    </>
  );
};

export default LiquidityActionsStack;
