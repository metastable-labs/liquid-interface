import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { LQDBottomSheet } from '@/components';
import { paymentMethodSelectionStyles as styles } from './styles';

const PaymentMethodSelection = ({
  method,
  setMethod,
}: IPaymentMethodSelection) => {
  const [show, setShow] = useState(false);

  const methods: Array<Methods> = [
    {
      icon: (color?: string) => (
        <Ionicons name="card" size={16} color={color || '#FFF'} />
      ),
      method: 'debit',
      title: 'Debit card',
    },
    {
      icon: (color?: string) => (
        <Ionicons name="logo-bitcoin" size={16} color={color || '#FFF'} />
      ),
      method: 'liquid',
      title: 'Liquid balance',
    },
    {
      icon: (color?: string) => (
        <Ionicons name="shield-outline" size={16} color={color || '#FFF'} />
      ),
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
      <TouchableOpacity
        style={styles.paymentSelector}
        onPress={() => setShow(true)}
      >
        {methods.find(({ method: m }) => m === method)?.icon('#64748B')}

        <Text style={styles.selectorText}>
          {methods.find(({ method: m }) => m === method)?.title}
        </Text>
        <Ionicons name="chevron-down" size={18} color="#64748B" />
      </TouchableOpacity>

      <LQDBottomSheet
        show={show}
        title="Select method"
        variant="primary"
        onClose={() => setShow(false)}
      >
        <View style={styles.container}>
          {methods.map(({ icon, method: m, title }, index) => {
            const active = method === m;

            return (
              <TouchableOpacity
                key={index}
                style={styles.selectorCard}
                onPress={() => action(active, m)}
                disabled={active}
              >
                <View style={styles.iconContainer}>{icon()}</View>

                <View style={styles.textContainer}>
                  <Text style={styles.text}>{title}</Text>
                </View>

                {active && (
                  <View style={styles.checkMarkContainer}>
                    <Ionicons name="checkmark" size={10} color="#FFFFFF" />
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
