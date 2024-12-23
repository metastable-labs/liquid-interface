import React from 'react';
import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { base, mainnet } from 'viem/chains';

import { LQDActionCard, LQDBottomSheet, LQDButton, LQDNumericKeyboard } from '@/components';
import { formatWithThousandSeparator, removeCommasFromNumber, truncate } from '@/utils/helpers';
import { useWalletConnect } from '@/providers';
import useSystemFunctions from '@/hooks/useSystemFunctions';
import styles from '../styles';
import AmountView from './amount-view';

const CryptoWalletDeposit = () => {
  const { disconnect, address, getUsdcBalance, depoditUsdc } = useWalletConnect();
  const { router, smartAccountState } = useSystemFunctions();
  const [amount, setAmount] = useState('');
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [balance, setBalance] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);

  const truncatedAddress = truncate(address || '');

  const disableButton =
    !parseFloat(removeCommasFromNumber(amount)) ||
    balance == undefined ||
    parseFloat(removeCommasFromNumber(amount)) > Number(balance || 0)!;

  const balancePartitions = [
    { text: '$10', action: () => setAmount('10') },
    { text: '$50', action: () => setAmount('50') },
    { text: '$100', action: () => setAmount('100') },
    { text: 'Max', action: () => setAmount(balance || '0') },
  ];

  const handleAmountChange = (key: string) => {
    if (key === '⌫') {
      return setAmount((prev) => formatWithThousandSeparator(prev.slice(0, -1)));
    }
    if (key === '.' && amount.includes('.')) {
      return;
    }
    setAmount((prev) => formatWithThousandSeparator(prev + key));
  };

  const fetchBalance = async () => {
    const result = await getUsdcBalance();
    setBalance(result);
  };

  const onDisconnect = async () => {
    try {
      await disconnect();
      router.back();
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
    }
  };

  const onSubmit = async () => {
    try {
      setLoading(true);
      await depoditUsdc(removeCommasFromNumber(amount), smartAccountState.address as `0x${string}`);

      setAmount('');
      setBalance(undefined);
      router.back();
    } catch (error) {
      //
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  return (
    <>
      <View style={styles.root}>
        <View style={styles.main}>
          <View style={styles.container}>
            <AmountView amount={amount} balance={balance} disableButton={disableButton} setShowBottomSheet={setShowBottomSheet} />

            <View style={styles.balanceSelectorContainer}>
              {balancePartitions.map(({ text, action }) => (
                <TouchableOpacity key={text} style={styles.balanceSelector} onPress={action}>
                  <Text style={styles.balanceSelectorText}>{text}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <LQDNumericKeyboard onKeyPress={handleAmountChange} />
        </View>

        <View style={styles.action}>
          <LQDButton loading={loading} title="Confirm" disabled={disableButton} onPress={onSubmit} variant="secondary" />
        </View>
      </View>

      <LQDBottomSheet show={showBottomSheet} title={truncatedAddress} onClose={() => setShowBottomSheet(false)}>
        <View style={{ marginBottom: 40 }}>
          <LQDActionCard actions={{ title: 'Disconnect' }} variant="disconnect" onSelect={onDisconnect} />
        </View>
      </LQDBottomSheet>
    </>
  );
};

export default CryptoWalletDeposit;
