import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { LQDBottomSheet, LQDButton, LQDNumericKeyboard } from '@/components';
import { adjustFontSizeForIOS, formatWithThousandSeparator, removeCommasFromNumber } from '@/utils/helpers';
import { ArrowDownIcon, ArrowDropdownDownIcon, DiscoverUSDIcon, MoonWellIcon } from '@/assets/icons';

const Invest = ({
  openCloseComment,
  showCommentSection,
  strategyId,
}: {
  openCloseComment: () => void;
  showCommentSection: boolean;
  strategyId: string;
}) => {
  const [amount, setAmount] = useState('');
  const walletBalance = 50;

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
    console.log('submit');
  };

  const disableButton =
    !parseFloat(removeCommasFromNumber(amount)) || parseFloat(removeCommasFromNumber(amount)) > Number(walletBalance || 0)!;

  return (
    <View style={{ flex: 1 }}>
      <LQDBottomSheet show={showCommentSection} title="Invest" variant="primary" onClose={openCloseComment}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <View style={styles.card}>
            <View style={styles.amountWrapper}>
              <Text style={styles.amount}>{amount || 0}</Text>
              <Text style={styles.max}>Max</Text>
            </View>
            <View>
              <View style={styles.dropDown}>
                <DiscoverUSDIcon width={20} height={20} />
                <Text style={styles.token}>USDC</Text>
                <ArrowDropdownDownIcon />
              </View>
              <View style={styles.availableBalanceWrapper}>
                <Text style={styles.availableText}>Available:</Text>
                <Text style={styles.balance}>3,600 USDC</Text>
              </View>
            </View>
          </View>
          <LQDNumericKeyboard onKeyPress={handleAmountChange} />

          <View style={styles.feeWrapper}>
            <Text style={[styles.selectorText, styles.fee]}>Fees:</Text>
            <Text style={[styles.selectorText, styles.feeAmount]}>$5</Text>
          </View>
        </View>
        <View style={styles.action}>
          <LQDButton title="Hold to confirm" disabled={disableButton} onLongPress={onSubmit} variant="secondary" />
        </View>
      </LQDBottomSheet>
    </View>
  );
};

export default Invest;

const styles = StyleSheet.create({
  action: {
    paddingHorizontal: 8,
    paddingVertical: 12,
    alignItems: 'stretch',
    marginBottom: 10,
  },

  token: {
    color: '#0F172A',
    fontWeight: '500',
    fontFamily: 'AeonikMedium',
    fontSize: adjustFontSizeForIOS(14, 2),
  },

  amount: {
    color: '#0F172A',
    fontWeight: '500',
    fontFamily: 'AeonikMedium',
    fontSize: adjustFontSizeForIOS(24, 2),
  },

  max: {
    color: '#375DFB',
    fontWeight: '400',
    fontFamily: 'AeonikRegular',
    fontSize: adjustFontSizeForIOS(12, 2),
  },

  availableText: {
    color: '#64748B',
    fontWeight: '400',
    fontFamily: 'AeonikRegular',
    fontSize: adjustFontSizeForIOS(12, 2),
  },

  amountWrapper: { flex: 1, gap: 5 },

  balance: {
    color: '#334155',
    fontWeight: '400',
    fontFamily: 'AeonikRegular',
    fontSize: adjustFontSizeForIOS(13, 2),
  },

  fee: {
    color: '#64748B',
    fontWeight: '400',
    fontFamily: 'AeonikRegular',
  },

  feeAmount: {
    color: '#475569',
  },

  feeWrapper: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,
    marginBottom: 40,
  },

  selectorText: {
    fontSize: adjustFontSizeForIOS(13, 2),
    lineHeight: 16.12,
    fontWeight: '500',
    textAlign: 'center',
    fontFamily: 'AeonikMedium',
  },

  availableBalanceWrapper: {
    flexDirection: 'row',
    gap: 6,
  },
  card: {
    borderWidth: 1,
    borderColor: '#EAEEF4',
    borderRadius: 12,
    flex: 1,
    paddingVertical: 20,
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 30,
    alignItems: 'center',
  },

  dropDown: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#F8FAFC',
    width: 114,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 400,
    alignSelf: 'flex-end',
    marginBottom: 8,
  },
});
