import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import { adjustFontSizeForIOS, formatWithThousandSeparator, formatAmount } from '@/utils/helpers';
import { DiscoverUSDIcon } from '@/assets/icons';

const PercentageSetter = ({ setPercentage, amount = 0, balance = 0 }: Percentage) => {
  const [percentage, setInternalPercentage] = useState(0);
  const [adjustedAmount, setAdjustedAmount] = useState(0);

  const percentages = [
    { value: 10, label: '10%' },
    { value: 25, label: '25%' },
    { value: 50, label: '50%' },
    { value: 75, label: '75%' },
    { value: 100, label: 'MAX' },
  ];

  const clampAmount = (inputAmount: number) => {
    return Math.min(Math.max(inputAmount, 0), balance);
  };

  useEffect(() => {
    if (amount && balance) {
      const validAmount = clampAmount(amount);

      const calculatedPercentage = (validAmount / balance) * 100;
      const clampedPercentage = Math.min(Math.max(calculatedPercentage, 0), 100);
      setInternalPercentage(Math.round(clampedPercentage));
    }
  }, [amount, balance]);

  useEffect(() => {
    if (balance) {
      setAdjustedAmount((balance * percentage) / 100);
    }
  }, [percentage, balance]);

  const handleSliderChange = (value: number) => {
    const clampedValue = Math.min(Math.max(value, 0), 100);
    setInternalPercentage(clampedValue);
  };

  const setPredefinedPercentage = (value: number) => {
    const clampedValue = Math.min(Math.max(value, 0), 100);
    setInternalPercentage(clampedValue);
  };

  useEffect(() => {
    const validAmount = clampAmount((balance * percentage) / 100);
    setAdjustedAmount(validAmount);
    if (setPercentage) {
      setPercentage(percentage);
    }
  }, [percentage, setPercentage, balance]);

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={styles.percentageWrapper}>
          <Text style={styles.label}>{percentage}%</Text>
          <Text style={styles.amount}>
            {formatAmount(adjustedAmount).toLocaleString()}
            USDC
          </Text>
        </View>
        <View style={styles.sliderContainer}>
          <Slider
            style={{ width: '100%', height: 16 }}
            minimumValue={0}
            maximumValue={100}
            step={1}
            value={percentage}
            onValueChange={handleSliderChange}
            minimumTrackTintColor="#4691FE"
            maximumTrackTintColor="#CBD5E1"
            thumbTintColor="#4691FE"
            tapToSeek
          />
        </View>
        <View style={styles.percentageWrapper}>
          <View style={styles.itemsFlex}>
            <DiscoverUSDIcon width={20} height={20} />
            <Text style={styles.token}>USDC</Text>
          </View>
          <View style={styles.itemsFlex}>
            <Text style={styles.investedText}>Invested:</Text>
            <Text style={styles.investedAmount}>{formatWithThousandSeparator(String(balance))}</Text>
          </View>
        </View>
      </View>

      <View style={styles.partitions}>
        {percentages.map(({ label, value }) => (
          <TouchableOpacity
            key={value}
            style={[styles.partition, percentage === value && styles.activePartition]}
            onPress={() => setPredefinedPercentage(value)}
          >
            <Text style={styles.partitionText}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default PercentageSetter;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignSelf: 'stretch',
    paddingVertical: 16,
    paddingHorizontal: 11,
    gap: 16,
    borderWidth: 1,
    borderColor: '#EAEEF4',
    borderRadius: 12,
  },

  top: {
    gap: 4,
  },

  label: {
    color: '#475569',
    fontSize: 18,
    lineHeight: 23.76,
    fontWeight: '500',
    fontFamily: 'AeonikMedium',
  },

  sliderContainer: {
    width: '100%',
  },

  partitions: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 18,
  },

  token: {
    color: '#0F172A',
    fontWeight: '500',
    fontFamily: 'AeonikMedium',
    fontSize: adjustFontSizeForIOS(14, 2),
  },

  amount: {
    color: '#475569',
    fontWeight: '400',
    fontFamily: 'AeonikMedium',
    fontSize: adjustFontSizeForIOS(15, 2),
  },

  investedText: {
    color: '#64748B',
    fontWeight: '400',
    fontFamily: 'AeonikRegular',
    fontSize: adjustFontSizeForIOS(12, 2),
  },

  investedAmount: {
    color: '#334155',
    fontWeight: '400',
    fontFamily: 'AeonikRegular',
    fontSize: adjustFontSizeForIOS(13, 2),
  },

  partition: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    maxHeight: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },

  activePartition: {
    backgroundColor: '#F1F5F9',
  },

  partitionText: {
    color: '#334155',
    fontSize: 13,
    lineHeight: 16.12,
    fontWeight: '500',
    fontFamily: 'AeonikMedium',
  },

  percentageWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  itemsFlex: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
});
