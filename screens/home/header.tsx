import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { HeaderMenuIcon, HeaderWalletIcon } from '@/assets/icons';
import { adjustFontSizeForIOS } from '@/utils/helpers';

const Header = ({ amount, actionLeft, actionRight }: IHeader) => {
  return (
    <View style={styles.container}>
      <View>
        {actionLeft && (
          <Pressable onPress={actionLeft}>
            <HeaderMenuIcon />
          </Pressable>
        )}
      </View>

      <View>
        {actionRight && (
          <Pressable onPress={actionRight} style={styles.amountWrap}>
            <Text style={styles.amount}>${amount}</Text>
            <HeaderWalletIcon />
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingVertical: 10,
    borderColor: '#F1F5F9',
  },
  amountWrap: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  amount: {
    fontSize: adjustFontSizeForIOS(18, 3),
    fontFamily: 'AeonikMedium',
    fontWeight: '500',
  },
});
