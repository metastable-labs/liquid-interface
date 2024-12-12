import { Stack } from 'expo-router';
import { LQDStackHeader } from '@/components';

const StrategyStack = () => {
  return (
    <Stack
      screenOptions={{
        header: (props) => <LQDStackHeader {...props} style={{ paddingTop: 60 }} hasTitle />,
        headerTitle: 'Create Strategy',
      }}
    >
      <Stack.Screen
        name="new-action-strategy"
        options={{
          header: (props) => <LQDStackHeader {...props} style={{ paddingTop: 60 }} hasTitle leftIcon="close" />,
          headerTitle: 'New Action',
          headerShown: true,
          presentation: 'fullScreenModal',
          animation: 'slide_from_bottom',
        }}
      />

      <Stack.Screen
        name="preview-strategy"
        options={{
          header: (props) => <LQDStackHeader {...props} style={{ paddingTop: 60 }} hasTitle />,
          headerTitle: 'Preview and publish',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="[strtegyId]"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default StrategyStack;
