import { View, StyleSheet, Text, TouchableOpacity, Pressable } from 'react-native';

import useSystemFunctions from '@/hooks/useSystemFunctions';
import { adjustFontSizeForIOS } from '@/utils/helpers';
import useAppActions from '@/store/app/actions';
import LQDImage from '../image';
import { IStrategyCard } from './types';
import { MoneysIcon } from '@/assets/icons';

const LQDStrategyCard = ({ strategy, actionTvl, navigationVariant = 'primary' }: IStrategyCard) => {
  const { router, pathname } = useSystemFunctions();
  const { searchIsFocused } = useAppActions();
  const onPress = () => {
    searchIsFocused(false);
    // router.push(`/(tabs)/home/`);
  };

  const avatar = strategy.image;
  const username = strategy.username;
  const tvl = strategy.tvl;
  const estimate = strategy.estimate;
  const steps = strategy.steps;

  return (
    <TouchableOpacity activeOpacity={0.5} onPress={onPress} style={styles.container}>
      <View style={[styles.iconContainer, { width: '25%' }]}>
        <LQDImage height={24} width={24} src={avatar} />
        <Text numberOfLines={1} style={styles.username}>
          {username}
        </Text>
      </View>
      <View style={styles.iconContainer}>
        <MoneysIcon fill="#253EA7" />
        <Text numberOfLines={1} style={styles.actions}>
          {steps.length} actions...
        </Text>
      </View>
      <View style={styles.iconContainer}>
        <Text style={styles.key}>Est. APY</Text>
        <Text style={styles.value}>{estimate}</Text>
      </View>
      <Pressable onPress={actionTvl} style={styles.iconContainer}>
        <Text style={styles.key}>TVL</Text>
        <Text style={styles.value}>{tvl}</Text>
      </Pressable>
    </TouchableOpacity>
  );
};

export default LQDStrategyCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
    gap: 8 + 15,
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
    fontSize: adjustFontSizeForIOS(14, 2),
    fontWeight: '500',
    fontFamily: 'ClashDisplayMedium',
    lineHeight: 15.6,
    marginTop: 4,
  },
  actions: {
    color: '#64748B',
    fontSize: adjustFontSizeForIOS(14, 2),
    fontWeight: '500',
    lineHeight: 16.12,
    fontFamily: 'ClashDisplayMedium',
  },
});
