import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { SearchEmptyStateIcon } from '@/assets/icons';
import { ILQNoResult } from './types';

const LQNoResult = ({ title, description }: ILQNoResult) => {
  return (
    <View style={styles.emptyContainer}>
      <SearchEmptyStateIcon />
      <Text style={styles.emptyTitle}>{title}</Text>
      <Text style={styles.emptyDescription}>{description}</Text>
    </View>
  );
};

export default LQNoResult;

const styles = StyleSheet.create({
  emptyContainer: {
    paddingHorizontal: 16,
    paddingTop: 34,
    alignItems: 'center',
    gap: 10,
  },

  emptyTitle: {
    textAlign: 'center',
    color: '#334155',
    fontSize: 17,
    fontFamily: 'AeonikBold',
    fontWeight: '700',
    marginTop: 10,
  },
  emptyDescription: {
    textAlign: 'center',
    color: '#64748B',
    fontSize: 15,
    fontFamily: 'AeonikRegular',
  },
});
