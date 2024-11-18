import { View, Text, StyleSheet, ScrollView, Platform, StatusBar as RNStatusBar } from 'react-native';

import useSystemFunctions from '@/hooks/useSystemFunctions';
import { LQDButton, SearchUI } from '@/components';
import { ILQDButton } from '@/components/button/types';
import { adjustFontSizeForIOS } from '@/utils/helpers';
import Card from './card';
import Empty from './empty';
import { emptyData } from './dummy';
import SearchPlaceholder from '@/components/search-ui/search-placeholder';

const Holdings = () => {
  const { router, accountState, appState } = useSystemFunctions();
  const { tokens, tokenBalance, positions, lpBalance } = accountState;

  const actions: Array<ILQDButton & { hide?: boolean }> = [
    {
      title: 'Add money',
      onPress: () => router.push('/deposit/debit'),
      variant: 'tertiary',
      fullWidth: false,
      icon: 'money',
      style: styles.action,
    },
    {
      title: 'Withdraw',
      onPress: () => router.push('/withdraw'),
      variant: 'tertiaryOutline',
      fullWidth: false,
      icon: 'arrow-up',
      style: styles.action,
      hide: tokenBalance <= 0,
    },
  ];

  const visibleActions = actions.filter((action) => !action.hide);
  const tokensUserHas = tokens.data?.filter?.((token) => token.isListed && Number(token.balance) > 0);

  const items: Array<IItem> = [
    {
      variant: 'primary',
      details: [{ title: 'Assets', value: `${tokensUserHas?.length || 0} assets` }],
      subtitle: '',
      title: `$${tokenBalance.toLocaleString()}`,
      empty: {
        ...emptyData.primary,
        action: {
          title: 'Add money',
          onPress: () => console.log('Deposit'),
        },
      },
      isEmpty: tokensUserHas?.length === 0,
    },
    {
      variant: 'secondary',
      details: [
        { title: 'Staked Balance:', value: `${100} AERO-LP` },
        { title: 'Your Pools', value: `${positions?.length} pools` },
      ],
      subtitle: `$${(10_706).toLocaleString()}`,
      title: `${lpBalance.toLocaleString()} AERO-LP`,
      empty: {
        ...emptyData.secondary,
        action: {
          title: 'Explore pools',
          onPress: () => console.log('explore'),
        },
      },
      isEmpty: positions?.length === 0,
    },
  ];

  const nonEmptyItems = items.filter((item) => !item.isEmpty);

  const emptyItems = items.filter((item) => item.isEmpty && item.empty).map((item) => item.empty);

  if (appState.showSearch) {
    return (
      <View style={styles.searchWrapper}>
        <SearchUI />
      </View>
    );
  }

  return (
    <>
      <SearchPlaceholder />

      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.balanceAndActionsContainer}>
          <View style={styles.balanceContainer}>
            <Text style={styles.balanceText}>Total Holdings</Text>
            <Text style={styles.balanceValue}>${(tokenBalance + lpBalance).toLocaleString()}</Text>
          </View>

          <View style={styles.actionsContainer}>
            {visibleActions.map((action, index) => (
              <LQDButton key={index} {...action} />
            ))}
          </View>
        </View>

        {Boolean(items.length) && (
          <View style={styles.cardContainer}>
            {nonEmptyItems.map((item, index) => (
              <Card key={index} {...item} />
            ))}
          </View>
        )}

        {Boolean(emptyItems.length) && (
          <View style={styles.emptyContainer}>
            {emptyItems.map((item, index) => (
              <Empty key={index} {...item!} isLast={index === emptyItems.length - 1} />
            ))}
          </View>
        )}
      </ScrollView>
    </>
  );
};

export default Holdings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 34,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },

  emptyContainer: {
    gap: 26,
  },

  cardContainer: {
    gap: 24,
  },

  contentContainer: {
    paddingBottom: 175,
    gap: 27,
  },

  balanceAndActionsContainer: {
    alignSelf: 'stretch',
    gap: 17,
    alignItems: 'stretch',
  },

  balanceContainer: {
    gap: 10,
  },

  balanceText: {
    color: '#64748B',
    fontSize: adjustFontSizeForIOS(13, 2),
    lineHeight: 16.12,
    fontFamily: 'AeonikRegular',
  },

  balanceValue: {
    color: '#0F172A',
    fontSize: adjustFontSizeForIOS(36, 4),
    lineHeight: 40.32,
    fontWeight: '700',
    fontFamily: 'QuantaGroteskProBold',
  },

  actionsContainer: {
    flexDirection: 'row',
    gap: 11,
  },

  action: {
    flex: 1,
  },

  searchWrapper: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 20,
    paddingBottom: Platform.OS === 'android' ? -(RNStatusBar.currentHeight || 0) : -48,
  },
});
