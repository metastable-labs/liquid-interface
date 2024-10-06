import { Stack } from 'expo-router';
import { LQDStackHeader } from '@/components';

const DepositStack = () => {
  return (
    <Stack
      screenOptions={{
        header: (props) => (
          <LQDStackHeader {...props} style={{ paddingTop: 80 }} hasTitle />
        ),
        headerTitle: 'Deposit',
      }}
    >
      <Stack.Screen name="debit" options={{}} />

      <Stack.Screen name="crypto" />
    </Stack>
  );
};

export default DepositStack;
