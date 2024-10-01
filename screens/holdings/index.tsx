import { View, Text, StyleSheet, ScrollView } from 'react-native';

import { LQDButton } from '@/components';
import { ILQDButton } from '@/components/button/types';
import Card from './card';
import Empty from './empty';
import { emptyData } from './dummy';

const holdings = 1_234_567.89;

const Holdings = () => {
  const actions: Array<ILQDButton> = [
    {
      title: 'Add money',
      onPress: () => console.log('Deposit'),
      variant: 'tertiary',
      fullWidth: false,
      icon: 'money',
      style: styles.action,
    },
    {
      title: 'Withdraw',
      onPress: () => console.log('Withdraw'),
      variant: 'tertiaryOutline',
      fullWidth: false,
      icon: 'arrow-up',
      style: styles.action,
    },
  ];

  const items: Array<IItem> = [
    {
      variant: 'primary',
      details: [{ title: 'Assets', value: `${6} assets` }],
      subtitle: `$${(12_304).toLocaleString()}`,
      title: `$${(12_304).toLocaleString()}`,
      empty: {
        ...emptyData.primary,
        action: {
          title: 'Add money',
          onPress: () => console.log('Deposit'),
        },
      },
      isEmpty: false,
    },
    {
      variant: 'secondary',
      details: [
        { title: 'Staked Balance:', value: `${100} AERO-LP` },
        { title: 'Your Pools', value: `${13} pools` },
      ],
      subtitle: `$${(10_706).toLocaleString()}`,
      title: `${260} AERO-LP`,
      empty: {
        ...emptyData.secondary,
        action: {
          title: 'Explore pools',
          onPress: () => console.log('explore'),
        },
      },
      isEmpty: false,
    },
    {
      variant: 'tertiary',
      details: [{ title: 'Unclaimed in:', value: `${13} pools` }],
      subtitle: `${(3104).toLocaleString()} AERO`,
      title: `$${(5_643.44).toLocaleString()}`,
      empty: emptyData.tertiary,
      isEmpty: true,
    },
    {
      variant: 'quaternary',
      details: [{ title: 'Your Pools', value: `${13} pools` }],
      subtitle: `$${(12_506).toLocaleString()}`,
      title: `$${(12_506).toLocaleString()}`,
      empty: emptyData.quaternary,
      isEmpty: true,
    },
  ];

  const nonEmptyItems = items.filter((item) => !item.isEmpty);

  const emptyItems = items
    .filter((item) => item.isEmpty && item.empty)
    .map((item) => item.empty);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.balanceAndActionsContainer}>
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceText}>Total Holdings</Text>
          <Text style={styles.balanceValue}>${holdings.toLocaleString()}</Text>
        </View>

        <View style={styles.actionsContainer}>
          {actions.map((action, index) => (
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
            <Empty
              key={index}
              {...item!}
              isLast={index === emptyItems.length - 1}
            />
          ))}
        </View>
      )}
    </ScrollView>
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
    fontSize: 13,
    lineHeight: 16.12,
  },

  balanceValue: {
    color: '#0F172A',
    fontSize: 36,
    lineHeight: 40.32,
    fontWeight: '700',
  },

  actionsContainer: {
    flexDirection: 'row',
    gap: 11,
  },

  action: {
    flex: 1,
  },
});
