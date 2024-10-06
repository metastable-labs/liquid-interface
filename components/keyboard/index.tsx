import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';

const LQDNumericKeyboard = ({ onKeyPress }: ILQDNumericKeyboard) => {
  const keys = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['.', '0', '⌫'],
  ];

  const handleKeyPress = async (key: string) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
    onKeyPress(key);
  };

  return (
    <View style={styles.keyboardContainer}>
      {keys.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((key) => (
            <TouchableOpacity
              key={key}
              style={styles.key}
              onPress={() => handleKeyPress(key)}
            >
              <Text style={styles.keyText}>{key}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  );
};

export default LQDNumericKeyboard;

const styles = StyleSheet.create({
  keyboardContainer: {
    width: 270,
    height: 228,
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  key: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
  },
  keyText: {
    color: '#020617',
    fontSize: 28,
    lineHeight: 31.36,
    fontWeight: '700',
    fontFamily: 'ClashDisplayBold',
  },
});
