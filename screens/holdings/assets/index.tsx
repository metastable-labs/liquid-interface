import { View, Text, StyleSheet, FlatList } from 'react-native';

import useSystemFunctions from '@/hooks/useSystemFunctions';
import { LQDButton } from '@/components';
import { ILQDButton } from '@/components/button/types';
import { adjustFontSizeForIOS } from '@/utils/helpers';
import AssetPaper from './paper';
import { useAccountActions } from '@/store/account/actions';

const Assets = () => {
  const { router, accountState } = useSystemFunctions();
  const { getPositions } = useAccountActions();
  const { tokens, tokenBalance, refreshing } = accountState;

  const actions: Array<ILQDButton> = [
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
    },
  ];

  const tokensUserHas = tokens.data?.filter?.((token) => token.isListed && Number(token.balance) > 0);
  const assets: IAssetPaper[] = tokensUserHas?.map?.((token) => ({
    iconUrl: token.logoUrl,
    name: token.symbol,
    value: Number(token.balance),
    usdValue: Number(token.balance) * Number(token.usdPrice),
  }));

  return (
    <View style={styles.container}>
      <View style={styles.balanceAndActionsContainer}>
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceText}>Total Holdings</Text>
          <Text style={styles.balanceValue}>${tokenBalance.toLocaleString()}</Text>
        </View>

        <View style={styles.actionsContainer}>
          {actions.map((action, index) => (
            <LQDButton key={index} {...action} />
          ))}
        </View>
      </View>

      <Text style={styles.assetLabel}>Assets</Text>

      <FlatList
        data={assets}
        renderItem={({ item }) => <AssetPaper {...item} />}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={{ gap: 24 }}
        refreshing={refreshing}
        onRefresh={() => getPositions(true)}
        bounces={true}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Assets;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 28,
    paddingBottom: 80,
    gap: 47,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
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

  assetLabel: {
    color: '#0F172A',
    fontSize: adjustFontSizeForIOS(20, 3),
    lineHeight: 23.2,
    fontWeight: '500',
    fontFamily: 'AeonikMedium',
    marginBottom: -20,
  },
});
