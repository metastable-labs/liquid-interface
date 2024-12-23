import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { LQDBottomSheet, LQDButton, LQDNumericKeyboard } from '@/components';
import { adjustFontSizeForIOS, formatWithThousandSeparator, removeCommasFromNumber } from '@/utils/helpers';
import { DiscoverUSDIcon } from '@/assets/icons';
import PercentageSetter from './percentage';

const Withdraw = ({
  openCloseComment,
  showCommentSection,
  strategyId,
}: {
  openCloseComment: () => void;
  showCommentSection: boolean;
  strategyId: string;
}) => {
  const [amount, setAmount] = useState('');
  const [percentage, setPercentage] = useState(0);
  const walletBalance = 1000;

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
      <LQDBottomSheet show={showCommentSection} title="Withdraw" variant="primary" onClose={openCloseComment}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <View style={styles.percentage}>
            <PercentageSetter amount={parseFloat(removeCommasFromNumber(amount))} setPercentage={setPercentage} balance={walletBalance} />
          </View>

          <LQDNumericKeyboard onKeyPress={handleAmountChange} />

          <View style={[styles.itemsWrapper, { marginTop: 40 }]}>
            <Text style={styles.availableText}>You’ll receive:</Text>
            <View style={styles.itemsFlex}>
              <DiscoverUSDIcon width={20} height={20} />
              <Text style={styles.fee}>3,600 USDC</Text>
            </View>
          </View>

          <View style={styles.itemsWrapper}>
            <Text style={styles.availableText}>Fees:</Text>
            <Text style={styles.fee}>$5</Text>
          </View>
        </View>

        <View style={styles.action}>
          <LQDButton title="Hold to confirm" disabled={disableButton} onLongPress={onSubmit} variant="secondary" />
        </View>
      </LQDBottomSheet>
    </View>
  );
};

export default Withdraw;

const styles = StyleSheet.create({
  action: {
    paddingHorizontal: 8,
    paddingVertical: 12,
    alignItems: 'stretch',
    marginBottom: 10,
    marginTop: 30,
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

  fee: {
    color: '#334155',
    fontWeight: '400',
    fontFamily: 'AeonikMedium',
    fontSize: adjustFontSizeForIOS(13, 2),
  },

  feeAmount: {
    color: '#475569',
  },

  balance: {
    color: '#334155',
    fontWeight: '400',
    fontFamily: 'AeonikRegular',
    fontSize: adjustFontSizeForIOS(13, 2),
  },

  itemsWrapper: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  selectorText: {
    fontSize: adjustFontSizeForIOS(13, 2),
    lineHeight: 16.12,
    fontWeight: '500',
    textAlign: 'center',
    fontFamily: 'AeonikMedium',
  },

  investedAmountWrapper: {
    flexDirection: 'row',
    gap: 6,
  },

  percentage: {
    marginBottom: 30,
    width: '100%',
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

  itemsFlex: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
});
