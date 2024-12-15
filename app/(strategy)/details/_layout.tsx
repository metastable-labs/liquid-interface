import { Stack } from 'expo-router';

import { LQDStackHeader } from '@/components';

const StrategyDetailLayout = () => {
  return (
    <>
      <Stack
        screenOptions={{
          header: (props) => <LQDStackHeader {...props} style={{ paddingTop: 60 }} hasTitle />,
          headerTitle: 'Strategy',
          headerShown: true,
        }}
      ></Stack>
    </>
  );
};

export default StrategyDetailLayout;
