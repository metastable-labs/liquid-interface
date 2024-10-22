import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { CardIcon, CaretDownIcon, CheckIcon, CoinsIcon } from '@/assets/icons';
import { LQDBottomSheet } from '@/components';
import { paymentMethodSelectionStyles as styles } from './styles';

const PaymentMethodSelection = ({ method, setMethod }: IPaymentMethodSelection) => {
  const [show, setShow] = useState(false);

  const methods: Array<Methods> = [
    {
      icon: (color?: string) => <CardIcon fill={color || '#FFF'} />,
      method: 'debit',
      title: 'Debit card',
    },
    {
      icon: (color?: string) => <CoinsIcon fill={color || '#FFF'} />,
      method: 'liquid',
      title: 'Liquid balance',
    },
    {
      icon: (color?: string) => <CardIcon fill={color || '#FFF'} />,
      method: 'coinbase',
      title: 'Coinbase Wallet',
    },
  ];

  const action = (active: boolean, method: Method) => {
    if (!active) {
      setMethod(method);
      setShow(false);
    }
  };

  return (
    <>
      <TouchableOpacity style={styles.paymentSelector} onPress={() => setShow(true)}>
        {methods.find(({ method: m }) => m === method)?.icon('#64748B')}

        <Text style={styles.selectorText}>{methods.find(({ method: m }) => m === method)?.title}</Text>
        <CaretDownIcon />
      </TouchableOpacity>

      <LQDBottomSheet show={show} title="Select method" variant="primary" onClose={() => setShow(false)}>
        <View style={styles.container}>
          {methods.map(({ icon, method: m, title }, index) => {
            const active = method === m;

            return (
              <TouchableOpacity key={index} style={styles.selectorCard} onPress={() => action(active, m)} disabled={active}>
                <View style={styles.iconContainer}>{icon()}</View>

                <View style={styles.textContainer}>
                  <Text style={styles.text}>{title}</Text>
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
    </>
  );
};

export default PaymentMethodSelection;
