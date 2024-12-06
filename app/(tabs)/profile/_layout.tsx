import { Stack } from 'expo-router';
import { LQDStackHeader } from '@/components';

const ProfileStack = () => {
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
        name="edit-profile"
        options={{
          header: (props) => <LQDStackHeader {...props} style={{ paddingTop: 14 }} />,
          headerShown: false, // fix header issue on this screen
        }}
      />
    </Stack>
  );
};

export default ProfileStack;
