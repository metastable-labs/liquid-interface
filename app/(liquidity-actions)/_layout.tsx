import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const LiquidityActionsStack = () => {
  return (
    <>
      <StatusBar style="inverted" />

      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="add" />
      </Stack>
    </>
  );
};

export default LiquidityActionsStack;
