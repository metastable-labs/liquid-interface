import { StyleSheet, View } from 'react-native';
import { Stack } from 'expo-router';

import { LQDButton, LQDStackHeader } from '@/components';
import { ILQDButton } from '@/components/button/types';
import useSystemFunctions from '@/hooks/useSystemFunctions';

const PoolDetailLayout = () => {
  const { router } = useSystemFunctions();

  const actions: Array<ILQDButton> = [
    {
      title: 'Add Liquidity',
      onPress: () => router.push('/(liquidity-actions)/add'),
      variant: 'tertiary',
    },
    {
      title: 'Remove Liquidity',
      onPress: () => router.push('/(liquidity-actions)/remove'),
      variant: 'tertiaryOutline',
    },
  ];

  return (
    <>
      <Stack
        screenOptions={{
          header: (props) => (
            <LQDStackHeader {...props} style={{ paddingTop: 50 }} />
          ),
          headerShown: true,
        }}
      >
        <Stack.Screen name="index" />
      </Stack>

      <View style={styles.actionsContainer}>
        {actions.map((action) => (
          <LQDButton
            key={action.title}
            {...action}
            fullWidth={false}
            style={styles.action}
          />
        ))}
      </View>
    </>
  );
};

export default PoolDetailLayout;

const styles = StyleSheet.create({
  actionsContainer: {
    position: 'absolute',
    bottom: 85,
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 22,
    flexDirection: 'row',
    gap: 11,
    backgroundColor: '#FFF',
  },

  action: {
    flex: 1,
  },
});
