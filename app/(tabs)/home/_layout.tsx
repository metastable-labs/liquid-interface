import { Stack } from 'expo-router';
import { LQDStackHeader } from '@/components';

const HomeStack = () => {
  return (
    <Stack
      screenOptions={{
        header: (props) => (
          <LQDStackHeader {...props} style={{ paddingTop: 34 }} />
        ),
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
        name="[poolId]"
        options={{
          header: (props) => (
            <LQDStackHeader {...props} style={{ paddingTop: 50 }} />
          ),
        }}
      />
    </Stack>
  );
};

export default HomeStack;
