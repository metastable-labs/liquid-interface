import React, { memo } from 'react';
import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Platform } from 'react-native';

import { formatAmount, truncate } from '@/utils/helpers';
import { CaretDownIcon, UserOctagonIcon } from '@/assets/icons';
import { useWalletConnect } from '@/providers';
import styles from '../styles';

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

interface AmountViewProps {
  amount: string;
  disableButton: boolean;
  balance: string | undefined;
  setShowBottomSheet: (value: boolean) => void;
}

const AmountView = ({ amount, balance, disableButton, setShowBottomSheet }: AmountViewProps) => {
  const { address } = useWalletConnect();
  const [showCursor, setShowCursor] = useState(true);

  const truncatedAddress = truncate(address || '');
  const myBalance = balance == undefined ? 'loading' : `${formatAmount(balance).toLocaleString()} USDC`;

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <View style={styles.inputAndPayment}>
      <View style={styles.balanceAndInput}>
        <View style={styles.inputContainer}>
          {amount && (
            <Text
              style={{
                ...styles.input,
                fontFamily: 'ClashDisplaySemibold',
                color: disableButton ? '#AF1D38' : '#020617',
                paddingBottom: 7,
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
        <Text style={[styles.selectorText, styles.paymentSelectorText]}>{truncatedAddress}</Text>
        <CaretDownIcon />
      </TouchableOpacity>

      <Text style={styles.balanceText}>Bal: {myBalance}</Text>
    </View>
  );
};

export default memo(AmountView);
