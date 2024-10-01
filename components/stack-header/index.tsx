import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { ILQDStackHeader } from './types';

const LQDStackHeader = ({ navigation, style }: ILQDStackHeader) => (
  <View style={[styles.root, style]}>
    <TouchableOpacity style={styles.container} onPress={navigation.goBack}>
      <Ionicons name="chevron-back" size={20} color="#0F172A" />
      <Text style={styles.title}>Back</Text>
    </TouchableOpacity>
  </View>
);
export default LQDStackHeader;

const styles = StyleSheet.create({
  root: { flexDirection: 'row', backgroundColor: '#fff', paddingBottom: 4 },

  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
    gap: 2,
  },

  title: {
    color: '#1E293B',
    fontSize: 14,
    lineHeight: 17.64,
    fontWeight: '500',
  },
});
