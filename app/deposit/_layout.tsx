import { Stack } from 'expo-router';
import { LQDStackHeader } from '@/components';
import useSystemFunctions from '@/hooks/useSystemFunctions';

const DepositStack = () => {
  const { appState } = useSystemFunctions();
  const { coinbaseIsActive } = appState;

  return (
    <Stack
      screenOptions={{
        header: (props) => <LQDStackHeader {...props} style={{ paddingTop: 80 }} hasTitle />,
        headerTitle: 'Deposit',
        headerShown: coinbaseIsActive ? false : true,
        contentStyle: { paddingTop: coinbaseIsActive ? 50 : 0 },
      }}
    >
      <Stack.Screen name="debit" />

      <Stack.Screen name="crypto" />
    </Stack>
  );
};

export default DepositStack;
