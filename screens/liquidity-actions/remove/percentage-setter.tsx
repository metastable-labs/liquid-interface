import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';

const PercentageSetter = ({ setPercentage }: IPercentageSetter) => {
  const [percentage, setInternalPercentage] = useState(25);

  const percentages = [
    { value: 10, label: '10%' },
    { value: 25, label: '25%' },
    { value: 50, label: '50%' },
    { value: 75, label: '75%' },
    { value: 100, label: 'MAX' },
  ];

  useEffect(() => {
    if (setPercentage) {
      setPercentage(percentage);
    }
  }, [percentage, setPercentage]);

  const handleSliderChange = (value: number) => {
    setInternalPercentage(Math.round(value));
  };

  const setPredefinedPercentage = (value: number) => {
    setInternalPercentage(value);
  };

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.label}>{percentage}%</Text>
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
            lowerLimit={1}
          />
        </View>
      </View>

      <View style={styles.partitions}>
        {percentages.map(({ label, value }) => (
          <TouchableOpacity
            key={value}
            style={[
              styles.partition,
              percentage === value && styles.activePartition,
            ]}
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
});
