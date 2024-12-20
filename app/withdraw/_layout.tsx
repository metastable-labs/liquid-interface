import { Stack } from 'expo-router';
import { LQDStackHeader } from '@/components';

const WithdrawStack = () => {
  return (
    <Stack
      screenOptions={{
        header: (props) => <LQDStackHeader {...props} style={{ paddingTop: 60 }} hasTitle />,
        headerTitle: 'Withdraw',
      }}
    >
      <Stack.Screen
        name="withdraw"
        options={{
          header: (props) => <LQDStackHeader {...props} style={{ paddingTop: 60 }} hasTitle />,
          headerTitle: 'Withdraw',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="recepient-address"
        options={{
          header: (props) => <LQDStackHeader {...props} style={{ paddingTop: 60 }} hasTitle />,
          headerTitle: 'Withdraw',
          headerShown: true,
        }}
      />
    </Stack>
  );
};

export default WithdrawStack;
