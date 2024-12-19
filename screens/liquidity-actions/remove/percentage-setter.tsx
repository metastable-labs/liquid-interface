import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, PanResponder, Animated } from 'react-native';
import { adjustFontSizeForIOS } from '@/utils/helpers';

interface IPercentageSetter {
  setPercentage: (value: number) => void;
}

const PercentageSetter = ({ setPercentage }: IPercentageSetter) => {
  const [percentage, setInternalPercentage] = useState(10);
  const [label, setInternalLabel] = useState('$10k');
  const [sliderWidth, setSliderWidth] = useState(1);
  const [startValue, setStartValue] = useState(0);

  const percentages = [
    { value: 50000, label: '$50k' },
    { value: 1000000, label: '$1m' },
    { value: 5000000, label: '$5m' },
    { value: 10000000, label: '$10m' },
    { value: 100000000, label: '$100m' },
  ];

  const pan = useRef(new Animated.Value(0)).current;

  const calculatePercentageFromValue = (value: number) => {
    const index = percentages.findIndex((p) => p.value === value);
    if (index === -1) return 0;
    return (index / (percentages.length - 1)) * 100;
  };

  const calculateValueFromPercentage = (percent: number) => {
    const index = Math.round((percent / 100) * (percentages.length - 1));
    return percentages[Math.min(Math.max(0, index), percentages.length - 1)].value;
  };

  const formatLabel = (value: number) => {
    if (value < 1000000) {
      return `$${Math.round(value / 1000)}k`;
    }
    return `$${(value / 1000000).toFixed(1)}m`;
  };

  useEffect(() => {
    if (setPercentage) {
      setPercentage(percentage);
    }
  }, [percentage, setPercentage]);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: (_, gestureState) => {
      pan.setOffset(pan.getValue());
    },
    onPanResponderMove: (_, gestureState) => {
      const percentageMove = (gestureState.dx / sliderWidth) * 100;
      const newPercentage = Math.max(0, Math.min(100, pan.getOffset() + percentageMove));

      pan.setValue(newPercentage);

      const newValue = calculateValueFromPercentage(newPercentage);
      setInternalPercentage(newValue);
      setInternalLabel(formatLabel(newValue));
    },
    onPanResponderRelease: () => {
      pan.flattenOffset();
    },
  });

  const setPredefinedValues = (value: number, label: string) => {
    setInternalPercentage(value);
    setInternalLabel(label);
    const newPercentage = calculatePercentageFromValue(value);
    pan.setValue(newPercentage);
  };

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.label}>{label}</Text>
        <Animated.View
          style={styles.sliderContainer}
          {...panResponder.panHandlers}
          onLayout={(event) => setSliderWidth(event.nativeEvent.layout.width)}
        >
          {/* ignore this i need to fix this pan animation */}
          {/* <View style={styles.track}>
            <View style={[styles.progress, { width: `${calculatePercentageFromValue(percentage)}%` }]} />
            <Animated.View
              style={[
                styles.thumb,
                {
                  transform: [
                    {
                      translateX: pan.interpolate({
                        inputRange: [0, 100],
                        outputRange: [-8, sliderWidth - 8], // Adjust by half thumb width to center
                      }),
                    },
                  ],
                },
              ]}
            />
          </View> */}
        </Animated.View>
      </View>

      <View style={styles.partitions}>
        {percentages.map(({ label, value }) => (
          <TouchableOpacity
            key={value}
            style={[styles.partition, percentage === value && styles.activePartition]}
            onPress={() => setPredefinedValues(value, label)}
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
    fontSize: adjustFontSizeForIOS(18, 2),
    lineHeight: 24,
    fontWeight: '500',
    fontFamily: 'AeonikMedium',
  },
  sliderContainer: {
    width: '100%',
    height: 20,
    justifyContent: 'center',
  },
  track: {
    width: '100%',
    height: 4,
    backgroundColor: '#CBD5E1',
    borderRadius: 2,
    position: 'relative',
  },
  progress: {
    height: '100%',
    backgroundColor: '#4691FE',
    borderRadius: 2,
  },
  thumb: {
    position: 'absolute',
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#4691FE',
    top: -6,
    marginLeft: -8,
  },
  partitions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    borderColor: '#4691FE',
  },
  partitionText: {
    color: '#334155',
    fontSize: adjustFontSizeForIOS(13, 2),
    lineHeight: 16,
    fontWeight: '500',
    fontFamily: 'AeonikMedium',
  },
});
