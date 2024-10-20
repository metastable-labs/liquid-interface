import { Text, StyleSheet, GestureResponderEvent, TouchableOpacity } from 'react-native';

import useSystemFunctions from '@/hooks/useSystemFunctions';
import { adjustFontSizeForIOS } from '@/utils/helpers';

const PoolCardAction = ({ disabled, id, type }: IPoolCardAction) => {
  const { router } = useSystemFunctions();

  const action = (event: GestureResponderEvent) => {
    event.stopPropagation();

    router.push({ pathname: '/liquidity-management', params: { id, type } });
  };

  return (
    <TouchableOpacity
      style={[styles.container, styles[`${type}Active`], disabled && styles[`${type}Disabled`]]}
      disabled={disabled}
      onPress={action}
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
    fontSize: adjustFontSizeForIOS(11, 2),
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
