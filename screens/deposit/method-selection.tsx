import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Href } from 'expo-router';

import { LQDBottomSheet } from '@/components';
import useSystemFunctions from '@/hooks/useSystemFunctions';
import { adjustFontSizeForIOS } from '@/utils/helpers';
import { CardAltIcon, CheckIcon, CoinsAltIcon } from '@/assets/icons';
import { IMethod, IPaymentMethodSelection } from './types';

const PaymentMethodSelection = ({ close, show }: IPaymentMethodSelection) => {
  const { pathname, router } = useSystemFunctions();

  const methods: Array<IMethod> = [
    {
      text: 'Debit card',
      icon: <CardAltIcon width={18} height={18} fill="#FFF" />,
      path: '/deposit/debit',
    },
    {
      text: 'Crypto',
      icon: <CoinsAltIcon width={18} height={18} fill="#FFF" />,
      path: '/deposit/crypto',
    },
  ];

  const action = (active: boolean, path: Href<string>) => {
    if (!active) {
      close();
      setTimeout(() => {
        if (path === '/deposit/debit') router.back();
        else router.push(path);
      }, 600);
    }
  };

  return (
    <LQDBottomSheet show={show} title="Select method" variant="primary" onClose={close}>
      <View style={styles.container}>
        {methods.map(({ text, icon, path }, index) => {
          const active = pathname === path;

          return (
            <TouchableOpacity key={index} style={styles.selectorCard} onPress={() => action(active, path)} disabled={active}>
              <View style={styles.iconContainer}>{icon}</View>

              <View style={styles.textContainer}>
                <Text style={styles.text}>{text}</Text>
              </View>

              {active && (
                <View style={styles.checkMarkContainer}>
                  <CheckIcon />
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </LQDBottomSheet>
  );
};

export default PaymentMethodSelection;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    gap: 14,
  },

  selectorCard: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    gap: 24,
    borderRadius: 20,
    backgroundColor: '#F8FAFC',
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconContainer: {
    padding: 6,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 9,
    backgroundColor: '#0F172A',
  },

  textContainer: {
    flex: 1,
  },

  text: {
    color: '#0F172A',
    fontSize: adjustFontSizeForIOS(16, 2),
    lineHeight: 19.2,
    fontWeight: '500',
    fontFamily: 'AeonikMedium',
  },

  checkMarkContainer: {
    padding: 3,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#4691FE',
    backgroundColor: '#4691FE',
  },
});
