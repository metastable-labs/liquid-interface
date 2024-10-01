import { Text, StyleSheet, TouchableOpacity } from 'react-native';

const PoolCardAction = ({ disabled, id, type }: IPoolCardAction) => {
  const actions = {
    stake: (id: string) => console.log(`Stake ${id}`),
    unstake: (id: string) => console.log(`Unstake ${id}`),
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        styles[`${type}Active`],
        disabled && styles[`${type}Disabled`],
      ]}
      disabled={disabled}
      onPress={() => actions[type](id)}
    >
      <Text style={[styles.title, styles[`${type}Title`]]}>{type}</Text>
    </TouchableOpacity>
  );
};

export default PoolCardAction;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingVertical: 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 20,
  },

  stakeActive: {
    backgroundColor: '#4691FE',
  },

  stakeDisabled: {
    backgroundColor: '#CBD5E1',
  },

  unstakeActive: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#F8FAFC',
  },

  unstakeDisabled: {
    opacity: 0.5,
  },

  title: {
    fontSize: 11,
    lineHeight: 13.64,
    textTransform: 'capitalize',
  },

  stakeTitle: {
    color: '#FFF',
  },

  unstakeTitle: {
    color: '#0F172A',
  },
});
