// import { Animated, Text } from 'react-native';
// import { ILQToast } from './types';

// const LQToast = ({ title, description, variant }: ILQToast) => {
//   return (
//     <Animated.View>
//       <Text>{title}</Text>
//       <Text>{description}</Text>
//     </Animated.View>
//   );
// };

// export default LQToast;

import React from 'react';
import { Animated, Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import useSystemFunctions from '@/hooks/useSystemFunctions';
import { useToastActions } from '@/store/toast/actions';

const LQToast = () => {
  const { toast } = useSystemFunctions();
  const { hideToast } = useToastActions();

  const { title, description, variant, isVisible } = toast;

  const handleDismiss = () => {
    hideToast();
  };

  if (!isVisible) return null;

  return (
    <Animated.View style={[styles.toastContainer, styles[variant]]}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <TouchableOpacity onPress={handleDismiss}>
        <Text style={styles.dismissText}>Dismiss</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default LQToast;

const styles = StyleSheet.create({
  toastContainer: {
    position: 'absolute',
    top: 50,
    padding: 10,
    right: 0,
    left: 0,
    borderRadius: 5,
    backgroundColor: '#333',
    zIndex: 23456789,
  },
  success: { backgroundColor: 'green' },
  error: { backgroundColor: 'red' },
  info: { backgroundColor: 'blue' },
  title: { fontSize: 16, fontWeight: 'bold', color: '#fff' },
  description: { fontSize: 14, color: '#fff' },
  dismissText: { fontSize: 12, color: 'yellow', marginTop: 5 },
});
