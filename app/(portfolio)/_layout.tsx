import { Stack } from 'expo-router';
import { LQDStackHeader } from '@/components';

const PortfolioStack = () => {
  return (
    <Stack
      screenOptions={{
        header: (props) => <LQDStackHeader {...props} style={{ paddingTop: 34 }} />,
        headerShown: true,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          header: (props) => <LQDStackHeader {...props} style={{ paddingTop: 60 }} hasTitle />,
          headerShown: true,
          headerTitle: 'Portfolio',
        }}
      />
    </Stack>
  );
};

export default PortfolioStack;
