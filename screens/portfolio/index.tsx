import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { LQDActionCard, LQDBottomSheet, LQDButton, LQDScrollView, LQDSlider, LQDStrategyCard } from '@/components';
import { adjustFontSizeForIOS, formatAmount } from '@/utils/helpers';
import { addMoney, strategyies } from '../discover/dummy';
import useSystemFunctions from '@/hooks/useSystemFunctions';
import AssetItem from './asset-item';
import { useToken } from '@/hooks/useToken';
import { publicClient } from '@/init/client';
import { PublicClient } from 'viem';

const Portfolio = () => {
  const { fetchTokens, tokens, loadingTokens } = useToken(publicClient as PublicClient);
  const [showModal, setShowModal] = useState(false);
  const [selectedAction, setSelectedAction] = useState('');
  const { router, smartAccountState } = useSystemFunctions();

  const openModal = () => {
    setShowModal((prev) => !prev);
    setSelectedAction('');
  };

  const navigateToWithdrawal = () => {
    router.push('/withdraw/withdraw');
  };

  const handleSelectAction = () => {
    openModal();

    setTimeout(() => {
      if (selectedAction === '1') {
        router.push('/deposit/crypto');
      }

      if (selectedAction === '2') {
        router.push('/deposit/debit');
      }

      if (selectedAction === '3') {
        // handle coinbase
      }
    }, 200);
  };

  const assets = tokens?.map?.((token) => ({
    title: token.symbol,
    subTitle: `${formatAmount(token.balance, 4)} ${token.symbol}`,
    icon: token.logoUrl,
  }));

  const fetchAllData = () => {
    if (!smartAccountState.address) return;
    fetchTokens(2, 0);
  };

  useEffect(() => {
    fetchAllData();
  }, [smartAccountState.address]);

  return (
    <>
      <View style={styles.topWrapper}>
        <View>
          <Text style={styles.title}>Portfolio</Text>
          <Text style={styles.subTitle}>$144,600</Text>
        </View>

        <View style={styles.btnWrapper}>
          <LQDButton onPress={openModal} style={{ width: '48%' }} fullWidth={false} title="Add money" variant="tertiary" icon="money" />
          <LQDButton
            onPress={navigateToWithdrawal}
            style={{ width: '48%' }}
            variant="tertiaryOutline"
            fullWidth={false}
            title="Withdraw"
            icon="arrow-up"
          />
        </View>
      </View>

      <LQDScrollView refreshing={false} onRefresh={fetchAllData} style={styles.container}>
        <LQDSlider
          items={[
            {
              title: 'Explore strategies',
              subTitle: 'Start earning on Liquid with DeFi Strategies',
              variant: 'strategy',
            },
            {
              title: 'Make a new deposit',
              subTitle: 'add funds to your liquid wallet and start earning',
              variant: 'deposit',
            },
          ]}
        />

        <View style={styles.allAsset}>
          <Text style={styles.position}>All Asset</Text>
          <View style={styles.strategyContainerStyle}>
            {!loadingTokens && assets.map((asset, index) => <AssetItem key={index} {...asset} />)}

            {!loadingTokens && !assets.length && (
              <View style={styles.assetContainer}>
                <Text style={styles.noPosition}>You have no assets</Text>
              </View>
            )}

            {loadingTokens && (
              <View style={styles.assetContainer}>
                <ActivityIndicator color="#000" />
              </View>
            )}
          </View>
        </View>

        <View style={styles.allPositions}>
          <Text style={styles.position}>Positions</Text>
          <View style={styles.strategyContainerStyle}>
            {strategyies.slice(0, 3).map((strategy, index) => (
              <LQDStrategyCard key={index} strategy={strategy} />
            ))}
            {!strategyies.length && <Text style={styles.noPosition}>You have no open positions</Text>}
          </View>
        </View>

        <LQDBottomSheet show={showModal} title="Add money" variant="primary" onClose={openModal}>
          <View style={styles.modalContainerStyle}>
            {addMoney.map((action, index) => (
              <LQDActionCard
                comingSoon={action.comingSoon}
                key={index}
                variant={action.icon}
                selected={selectedAction === action.id}
                actions={action}
                onSelect={() => !action.comingSoon && setSelectedAction(action.id)}
              />
            ))}
          </View>

          <View style={styles.bottomWrapper}>
            <LQDButton disabled={!selectedAction} title="Continue" variant="secondary" onPress={handleSelectAction} />
          </View>
        </LQDBottomSheet>
      </LQDScrollView>
    </>
  );
};

export default Portfolio;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop: 10,
  },
  title: {
    color: '#64748B',
    fontSize: adjustFontSizeForIOS(13, 1),
    lineHeight: 16.12,
    fontWeight: '400',
    fontFamily: 'AeonikMedium',
    marginVertical: 15,
  },
  position: {
    color: '#0F172A',
    fontSize: adjustFontSizeForIOS(14, 1),
    lineHeight: 18.48,
    fontWeight: '500',
    fontFamily: 'AeonikMedium',
  },
  subTitle: {
    color: '#1E293B',
    fontSize: adjustFontSizeForIOS(36, 1),
    lineHeight: 40.32,
    fontWeight: '700',
    fontFamily: 'QuantaGroteskProBold',
  },
  noPosition: {
    color: '#1E293B',
    fontSize: adjustFontSizeForIOS(11, 1),
    lineHeight: 13.64,
    fontWeight: '400',
    fontFamily: 'AeonikMedium',
    textAlign: 'center',
    marginVertical: 30,
  },
  strategyContainerStyle: { gap: 20, marginTop: 15 },
  modalContainerStyle: { gap: 20, paddingBottom: 50 },
  bottomWrapper: { marginTop: 10, marginBottom: 30, marginHorizontal: 10 },
  dotsWrapper: {
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: 'green',
  },
  indicatorDot: {
    width: 8,
    height: 8,
    borderRadius: 8 / 2,
    borderColor: 'green',
    borderWidth: 1,
    marginRight: 8,
  },
  btnWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  topWrapper: { paddingHorizontal: 16, backgroundColor: '#fff', paddingBottom: 15 },
  allAsset: { paddingHorizontal: 16, marginBottom: 20 },
  allPositions: { paddingHorizontal: 16, paddingBottom: 60 },

  assetContainer: {
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});
