import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Platform } from 'react-native';

import { publicClient } from '@/init/viem';
import { PublicClient } from 'viem';

import { LQDButton, LQDCoinbaseWebView, LQDNumericKeyboard } from '@/components';
import { formatWithThousandSeparator, removeCommasFromNumber } from '@/utils/helpers';
import { CardIcon, CaretDownIcon } from '@/assets/icons';
import PaymentMethodSelection from '../method-selection';
import useSystemFunctions from '@/hooks/useSystemFunctions';
import { useToken } from '@/hooks/useToken';
import styles from '../styles';
import useAppActions from '@/store/app/actions';

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

const DebitDeposit = () => {
  const { smartAccountState, appState } = useSystemFunctions();
  const { coinbaseIsActive } = useAppActions();

  // const {} = useToken(publicClient as PublicClient);

  const [amount, setAmount] = useState('');
  const [balance, setBalance] = useState(999);
  const [showCursor, setShowCursor] = useState(true);
  const [showBottomSheet, setShowBottomSheet] = useState(false);

  const balancePartitions = [
    { text: '$10', action: () => setAmount('10') },
    { text: '$50', action: () => setAmount('50') },
    { text: '$100', action: () => setAmount('100') },
    { text: '$500', action: () => setAmount('500') },
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

  const onSubmit = () => {
    const amountNumber = parseFloat(removeCommasFromNumber(amount));
    console.log('submit', { amount: amountNumber });

    coinbaseIsActive(true);
  };

  useEffect(() => {
    coinbaseIsActive(false);

    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  if (appState.coinbaseIsActive) {
    return (
      <>
        <LQDCoinbaseWebView
          amount={parseFloat(removeCommasFromNumber(amount))}
          destinationAddress={smartAccountState.address || '0x6Ad870d1dD2Fac9b21b0110330e55414324C03aa'}
        />
      </>
    );
  }

  return (
    <>
      <View style={styles.root}>
        <View style={styles.main}>
          <View style={styles.container}>
            <View style={styles.inputAndPayment}>
              <View style={styles.balanceAndInput}>
                <Text style={styles.balanceText}>Bal: ${balance.toLocaleString()}</Text>

                <View style={styles.inputContainer}>
                  {amount && (
                    <Text
                      style={{
                        ...styles.input,
                        fontFamily: 'ClashDisplaySemibold',
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
                <CardIcon />
                <Text style={[styles.selectorText, styles.paymentSelectorText]}>Debit card</Text>
                <CaretDownIcon />
              </TouchableOpacity>
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
        </View>

        <View style={styles.action}>
          <LQDButton title="Hold to confirm" disabled={!parseFloat(amount)} onLongPress={onSubmit} variant="secondary" />
        </View>
      </View>

      <PaymentMethodSelection close={() => setShowBottomSheet(false)} show={showBottomSheet} />
    </>
  );
};

export default DebitDeposit;
