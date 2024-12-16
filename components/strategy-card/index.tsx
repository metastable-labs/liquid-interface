import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

import useSystemFunctions from '@/hooks/useSystemFunctions';
import { adjustFontSizeForIOS } from '@/utils/helpers';
import useAppActions from '@/store/app/actions';
import LQDImage from '../image';
import { MoneysIcon } from '@/assets/icons';

const LQDStrategyCard = (strategy: Strategy) => {
  const { router } = useSystemFunctions();
  const { searchIsFocused } = useAppActions();

  const { id, metrics, steps } = strategy;

  const onPress = (strategyId: string) => {
    searchIsFocused(false);
    router.push(`/details/${strategyId}`);
  };

  const username = 'Meister';
  const tvl = metrics.tvl;
  const apy = metrics.apy;

  return (
    <TouchableOpacity activeOpacity={0.5} onPress={() => onPress(strategy.id)} style={styles.container}>
      <View style={[styles.iconContainer, styles.profileContainer]}>
        <LQDImage height={24} width={24} />
        <Text numberOfLines={1} style={styles.username}>
          @{username}
        </Text>
      </View>

      <View style={[styles.iconContainer, styles.actionsContainer]}>
        <MoneysIcon fill="#253EA7" />
        <Text numberOfLines={1} style={styles.actions}>
          {steps.length} action{steps.length > 1 ? 's' : ''}...
        </Text>
      </View>

      <View style={[styles.iconContainer, styles.apyContainer]}>
        <Text style={styles.key}>Est. APY</Text>
        <Text style={styles.value}>{apy}%</Text>
      </View>

      <View style={[styles.iconContainer, styles.tvlContainer]}>
        <Text style={styles.key}>TVL</Text>
        <Text style={styles.value}>{tvl}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default LQDStrategyCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#EAEEF4',
    backgroundColor: '#fff',
  },

  iconContainer: {
    gap: 5,
  },

  profileContainer: {
    width: '25%',
  },

  actionsContainer: {
    width: '30%',
  },

  apyContainer: {
    width: '22%',
  },

  tvlContainer: {
    width: '19%',
  },

  icon: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: '#EAEEF4',
    marginRight: -6,
  },

  username: {
    color: '#64748B',
    fontSize: adjustFontSizeForIOS(12, 2),
    fontWeight: '500',
    lineHeight: 16,
    fontFamily: 'AeonikMedium',
  },
  key: {
    color: '#64748B',
    fontSize: adjustFontSizeForIOS(12, 2),
    fontWeight: '400',
    fontFamily: 'AeonikMedium',
  },
  value: {
    color: '#4691FE',
    fontSize: adjustFontSizeForIOS(13, 2),
    fontWeight: '500',
    fontFamily: 'ClashDisplayMedium',
    lineHeight: 15.6,
    marginTop: 4,
  },
  actions: {
    color: '#64748B',
    fontSize: adjustFontSizeForIOS(13, 2),
    fontWeight: '500',
    lineHeight: 16.12,
    fontFamily: 'ClashDisplayMedium',
  },
});
