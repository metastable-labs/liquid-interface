import { Stack } from 'expo-router';
import { LQDStackHeader } from '@/components';

const HoldingsStack = () => {
  return (
    <Stack
      screenOptions={{
        header: (props) => <LQDStackHeader {...props} style={{ paddingTop: 14 }} />,
        headerShown: true,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="assets"
        options={{
          header: (props) => <LQDStackHeader {...props} style={{ paddingTop: 34 }} />,
        }}
      />

      <Stack.Screen
        name="[poolId]"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default HoldingsStack;
