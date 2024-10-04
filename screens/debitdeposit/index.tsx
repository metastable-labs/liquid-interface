import { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { LQDBottomSheet, LQDButton, LQDNumericKeyboard } from '@/components';
import {
  formatWithThousandSeparator,
  removeCommasFromNumber,
} from '@/utils/helpers';
import PaymentMethodSelection from './method-selection';

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
      return setAmount((prev) =>
        formatWithThousandSeparator(prev.slice(0, -1))
      );
    }
    if (key === '.' && amount.includes('.')) {
      return;
    }
    setAmount((prev) => formatWithThousandSeparator(prev + key));
  };

  const onSubmit = () => {
    const amountNumber = parseFloat(removeCommasFromNumber(amount));
    console.log('submit', { amount: amountNumber });
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
                <Text style={styles.balanceText}>
                  Bal: ${balance.toLocaleString()}
                </Text>

                <View style={styles.inputContainer}>
                  {amount && <Text style={styles.input}>$</Text>}
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

              <TouchableOpacity
                style={styles.paymentSelector}
                onPress={() => setShowBottomSheet(true)}
              >
                <Ionicons name="cash-outline" size={18} color="#64748B" />
                <Text style={[styles.selectorText, styles.paymentSelectorText]}>
                  Debit card
                </Text>
                <Ionicons name="chevron-down" size={18} color="#64748B" />
              </TouchableOpacity>
            </View>

            <View style={styles.balanceSelectorContainer}>
              {balancePartitions.map(({ text, action }) => (
                <TouchableOpacity
                  key={text}
                  style={styles.balanceSelector}
                  onPress={action}
                >
                  <Text style={styles.balanceSelectorText}>{text}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <LQDNumericKeyboard onKeyPress={handleAmountChange} />
        </View>

        <View style={styles.action}>
          <LQDButton
            title="Hold to confirm"
            disabled={!parseFloat(amount)}
            onLongPress={onSubmit}
            variant="secondary"
          />
        </View>
      </View>

      <PaymentMethodSelection
        close={() => setShowBottomSheet(false)}
        show={showBottomSheet}
      />
    </>
  );
};

export default DebitDeposit;

const styles = StyleSheet.create({
  root: {
    paddingTop: 47,
    paddingHorizontal: 16,
    paddingBottom: 34,
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },

  main: {
    alignItems: 'center',
    gap: 44,
  },

  container: {
    alignSelf: 'stretch',
    gap: 20,
  },

  inputAndPayment: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    gap: 20,
  },

  balanceAndInput: {
    alignItems: 'center',
    gap: 8,
  },

  balanceText: {
    color: '#64748B',
    fontSize: 16,
    lineHeight: 19.84,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: -0.96,
  },

  input: {
    color: '#020617',
    fontSize: 48,
    lineHeight: 53,
    letterSpacing: -0.96,
    fontWeight: '700',
    fontFamily: 'ClashDisplayBold',
  },

  cursor: {
    width: 4,
    height: 48,
    backgroundColor: '#4691FE',
    position: 'absolute',
    right: -5,
  },

  selectorText: {
    fontSize: 13,
    lineHeight: 16.12,
    fontWeight: '500',
    textAlign: 'center',
  },

  paymentSelector: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#F8FAFC',
  },

  paymentSelectorText: {
    color: '#475569',
  },

  balanceSelectorContainer: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 11,
  },

  balanceSelector: {
    height: 30,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#F8FAFC',
  },

  balanceSelectorText: {
    color: '#334155',
  },

  action: {
    paddingHorizontal: 8,
    paddingVertical: 12,
    alignItems: 'stretch',
  },
});
