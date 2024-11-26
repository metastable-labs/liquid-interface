import React, { useEffect, useRef } from 'react';
import { Animated, Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import useSystemFunctions from '@/hooks/useSystemFunctions';
import { useToastActions } from '@/store/toast/actions';
import { CloseToastIcon, ToastVarintIcon } from '@/assets/icons';

const LQToast = () => {
  const { toast } = useSystemFunctions();
  const { hideToast } = useToastActions();

  const { title, description, variant, isVisible } = toast;

  const iconsMap = {
    success: <ToastVarintIcon variant="success" />,
    error: <ToastVarintIcon variant="error" />,
  };

  const icon = iconsMap[variant] || null;

  const slideAnim = useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    if (isVisible) {
      Animated.timing(slideAnim, {
        toValue: 60,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -100,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible, slideAnim]);

  const handleDismiss = () => {
    hideToast();
  };

  return (
    <Animated.View style={[styles.toastContainer, styles[variant], { transform: [{ translateY: slideAnim }] }]}>
      {icon}
      <View style={{ flex: 1, gap: 3 }}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <TouchableOpacity style={{ marginRight: 3 }} onPress={handleDismiss}>
        <CloseToastIcon />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default LQToast;

const styles = StyleSheet.create({
  toastContainer: {
    position: 'absolute',
    paddingHorizontal: 10,
    paddingVertical: 13,
    right: 20,
    left: 20,
    borderRadius: 5,
    zIndex: 23456789,
    flexDirection: 'row',
    gap: 10,
    backgroundColor: 'red',
  },
  success: { backgroundColor: '#EFFAF6', top: 10 },
  error: { backgroundColor: '#FDEDF0', top: 10 },
  title: { fontSize: 15, fontFamily: 'AeonikMedium', fontWeight: '700', color: '#0A0D14' },
  description: { color: '#64748B', fontSize: 15, fontFamily: 'AeonikRegular', fontWeight: '500' },
});
