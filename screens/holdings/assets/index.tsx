import { View, Text, StyleSheet, ScrollView } from 'react-native';

import useSystemFunctions from '@/hooks/useSystemFunctions';
import { LQDButton } from '@/components';
import { ILQDButton } from '@/components/button/types';
import AssetPaper from './paper';

const holdings = 1_234_567.89;

const Assets = () => {
  const { router } = useSystemFunctions();

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
      onPress: () => console.log('Withdraw'),
      variant: 'tertiaryOutline',
      fullWidth: false,
      icon: 'arrow-up',
      style: styles.action,
    },
  ];

  const assets: Array<IAssetPaper> = [
    {
      iconUrl: 'https://res.cloudinary.com/dxnd4k222/image/upload/v1727119033/is3tphz7tf06jpj5g7x3.png',
      name: 'USDC',
      value: 4_506.78,
      usdValue: 4_506.78,
    },
    {
      iconUrl: 'https://res.cloudinary.com/dxnd4k222/image/upload/v1727119032/uwficdtvggd49apjfpt4.png',
      name: 'ETH',
      value: 300,
      usdValue: 1_234_567.89,
    },
    {
      iconUrl: 'https://res.cloudinary.com/dxnd4k222/image/upload/v1727119033/is3tphz7tf06jpj5g7x3.png',
      name: 'USDC',
      value: 4_506.78,
      usdValue: 4_506.78,
    },
    {
      iconUrl: 'https://res.cloudinary.com/dxnd4k222/image/upload/v1727119032/uwficdtvggd49apjfpt4.png',
      name: 'ETH',
      value: 300,
      usdValue: 1_234_567.89,
    },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
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

      <View style={styles.assetContainer}>
        <Text style={styles.assetLabel}>Assets</Text>

        <View style={styles.assetMap}>
          {assets.map((asset, index) => (
            <AssetPaper key={index} {...asset} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default Assets;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 28,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },

  contentContainer: {
    paddingBottom: 175,
    gap: 47,
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
    fontFamily: 'AeonikRegular',
  },

  balanceValue: {
    color: '#0F172A',
    fontSize: 36,
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

  assetContainer: {
    alignSelf: 'stretch',
    gap: 20,
  },

  assetLabel: {
    color: '#0F172A',
    fontSize: 20,
    lineHeight: 23.2,
    fontWeight: '500',
    fontFamily: 'AeonikMedium',
  },

  assetMap: {
    alignItems: 'stretch',
    gap: 24,
  },
});
