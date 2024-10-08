import { StyleSheet, View } from 'react-native';
import { Stack } from 'expo-router';

import { LQDButton, LQDStackHeader } from '@/components';
import { ILQDButton } from '@/components/button/types';

const PoolDetailLayout = () => {
  const actions: Array<ILQDButton> = [
    {
      title: 'Add Liquidity',
      onPress: () => console.log('Add liquidity'),
      variant: 'tertiary',
    },
    {
      title: 'Remove Liquidity',
      onPress: () => console.log('Remove liquidity'),
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
