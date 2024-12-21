import React from 'react';
import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Platform } from 'react-native';
import { parseEther } from 'viem';
import { base, mainnet } from 'viem/chains';

import { LQDActionCard, LQDBottomSheet, LQDButton, LQDNumericKeyboard } from '@/components';
import { formatAmount, formatWithThousandSeparator, removeCommasFromNumber } from '@/utils/helpers';
import { CaretDownIcon, UserOctagonIcon } from '@/assets/icons';
import styles from '../styles';
import { useWalletConnect } from '@/providers';

const getMaxWidth = (amount: string) => {
  const baseWidth = 27;
  const maxDigitsBeforeAuto = 4;

  if (!amount) return 106;

  const plainAmount = amount.replace(/,/g, '');
  const amountLength = plainAmount.length;

  if (amountLength > maxDigitsBeforeAuto) return undefined;

  const commaWidth = amountLength === 4 ? baseWidth / 3 : 0;

  const totalWidth = baseWidth * amountLength + commaWidth;

  return totalWidth;
};

const CryptoWalletDeposit = () => {
  const { walletClient } = useWalletConnect();

  const [amount, setAmount] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [address, setAddress] = useState('0x8db6...aEA8');
  const [showBottomSheet, setShowBottomSheet] = useState(false);

  const walletBalance = 100;

  const disableButton =
    !parseFloat(removeCommasFromNumber(amount)) || parseFloat(removeCommasFromNumber(amount)) > Number(walletBalance || 0)!;

  const balancePartitions = [
    { text: '$10', action: () => setAmount('10') },
    { text: '$50', action: () => setAmount('50') },
    { text: '$100', action: () => setAmount('100') },
    { text: 'Max', action: () => setAmount('500') },
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

  const onSubmit = async () => {
    // const amountNumber = parseFloat(removeCommasFromNumber(amount));
    // console.log('submit', { amount: amountNumber });
    onSendTransaction();
  };

  const onSendTransaction = async () => {
    try {
      if (!walletClient) {
        return;
      }
      const [address] = await walletClient.getAddresses();

      const hash = await walletClient.sendTransaction({
        chain: mainnet,
        account: address,
        to: '0x704457b418E9Fb723e1Bc0cB98106a6B8Cf87689', // test address
        value: parseEther('0.00009'),
        data: '0x',
      });

      return {
        method: 'send transaction',
        response: hash,
      };
    } catch (error) {
      console.error('Error sending transaction:', error);
    }
  };

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <>
      <View style={styles.root}>
        <View style={styles.main}>
          <View style={styles.container}>
            <View style={styles.inputAndPayment}>
              <View style={styles.balanceAndInput}>
                <View style={styles.inputContainer}>
                  {amount && (
                    <Text
                      style={{
                        ...styles.input,
                        fontFamily: 'ClashDisplaySemibold',
                        color: disableButton ? '#AF1D38' : '#020617',
                      }}
                    >
                      $
                    </Text>
                  )}
                  <TextInput
                    style={[
                      styles.input,
                      Platform.OS === 'android' && {
                        maxWidth: getMaxWidth(amount),
                      },
                      { color: disableButton ? '#AF1D38' : '#020617' },
                    ]}
                    value={amount}
                    placeholder="$100"
                    placeholderTextColor="#CBD5E1"
                    editable={false}
                  />
                  {showCursor && <View style={styles.cursor} />}
                </View>
              </View>

              <TouchableOpacity style={styles.paymentSelector} onPress={() => setShowBottomSheet(true)}>
                <UserOctagonIcon />
                <Text style={[styles.selectorText, styles.paymentSelectorText]}>{address}</Text>
                <CaretDownIcon />
              </TouchableOpacity>

              <Text style={styles.balanceText}>Bal: {formatAmount(walletBalance).toLocaleString()} USDC</Text>
            </View>

            <View style={styles.balanceSelectorContainer}>
              {balancePartitions.map(({ text, action }) => (
                <TouchableOpacity key={text} style={styles.balanceSelector} onPress={action}>
                  <Text style={styles.balanceSelectorText}>{text}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <LQDNumericKeyboard onKeyPress={handleAmountChange} />
          <View style={styles.feeWrapper}>
            <Text style={[styles.selectorText, styles.fee]}>Fees:</Text>
            <Text style={[styles.selectorText, styles.feeAmount]}>$5</Text>
          </View>
        </View>

        <View style={styles.action}>
          <LQDButton title="Hold to confirm" disabled={disableButton} onPress={onSubmit} variant="secondary" />
        </View>
      </View>

      <LQDBottomSheet show={showBottomSheet} title={address} onClose={() => setShowBottomSheet(false)}>
        <View style={{ marginBottom: 40 }}>
          <LQDActionCard actions={{ title: 'Disconnect' }} variant="disconnect" onSelect={() => {}} />
        </View>
      </LQDBottomSheet>
    </>
  );
};

export default CryptoWalletDeposit;
