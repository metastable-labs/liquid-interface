import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Platform } from 'react-native';
import FastImage from 'react-native-fast-image';

import { LQDAssetSelection, LQDButton, LQDNumericKeyboard } from '@/components';
import { formatAmount, formatWithThousandSeparator, removeCommasFromNumber } from '@/utils/helpers';
import { CaretDownIcon } from '@/assets/icons';
import { TokenItem } from '@/store/account/types';
import useSystemFunctions from '@/hooks/useSystemFunctions';
import styles from './styles';

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

const Withdraw = () => {
  const { accountState } = useSystemFunctions();
  const [amount, setAmount] = useState('');
  const [asset, setAsset] = useState<TokenItem>();
  const [showCursor, setShowCursor] = useState(true);
  const [showBottomSheet, setShowBottomSheet] = useState(false);

  const balancePartitions = [
    { text: '$10', action: () => setAmount('10') },
    { text: '$50', action: () => setAmount('50') },
    { text: '$100', action: () => setAmount('100') },
    { text: '$500', action: () => setAmount('500') },
  ];

  const disableButton = !parseFloat(removeCommasFromNumber(amount)) || parseFloat(removeCommasFromNumber(amount)) > Number(asset?.balance)!;

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
  };

  useEffect(() => {
    if (!accountState.tokens?.data) return;

    setAsset(accountState.tokens?.data[0]);
  }, [accountState.tokens]);

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
                  Bal: ${formatAmount(asset?.balance).toLocaleString()} {asset?.symbol}
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

              <TouchableOpacity style={styles.assetSelector} onPress={() => setShowBottomSheet(true)}>
                <View style={styles.iconContainer}>
                  <FastImage
                    style={styles.icon}
                    source={{
                      uri: asset?.logoUrl,
                      priority: FastImage.priority.high,
                    }}
                    resizeMode={FastImage.resizeMode.contain}
                  />
                </View>

                <Text style={[styles.selectorText, styles.paymentSelectorText]}>{asset?.symbol}</Text>

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
          <LQDButton title="Hold to confirm" disabled={disableButton} onLongPress={onSubmit} variant="secondary" />
        </View>
      </View>

      <LQDAssetSelection title="Select Asset" close={() => setShowBottomSheet(false)} setAsset={setAsset} show={showBottomSheet} />
    </>
  );
};

export default Withdraw;
