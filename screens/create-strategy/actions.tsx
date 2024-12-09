import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { CloseIcon, DragHandleIcon, PlusIcon } from '@/assets/icons'; // Replace these with your icon components or placeholders
import { adjustFontSizeForIOS } from '@/utils/helpers';

const ActionItem = ({ text, onAdd }: { text: string; onAdd: () => void }) => {
  return (
    <View style={styles.actionItem}>
      <View>
        <DragHandleIcon />
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: 2,
          borderStyle: 'dashed',
          borderRadius: 16,
          borderColor: '#EAEEF4',
          paddingHorizontal: 16,
          paddingVertical: 5,
        }}
      >
        <Text style={styles.actionText}>{text}</Text>
        <TouchableOpacity onPress={onAdd} style={styles.addButton}>
          <PlusIcon fill="#64748B" height={18} width={18} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Actions = ({ addAction }) => {
  const [actions, setActions] = useState([{ id: Date.now(), text: 'Add new action' }]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Actions</Text>
      <FlatList
        data={actions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ActionItem text={item.text} onAdd={addAction} />}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

export default Actions;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  title: {
    fontWeight: '500',
    marginBottom: 16,
    color: '#181E00',
    fontSize: adjustFontSizeForIOS(14, 2),
    lineHeight: 18.48,
    fontFamily: 'AeonikMedium',
  },
  listContainer: {
    gap: 12,
    // backgroundColor: 'green',
    borderWidth: 1,
    borderColor: '#F1F5F9',
    padding: 20,
    borderRadius: 18,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },

  actionText: {
    flex: 1,
    fontSize: adjustFontSizeForIOS(14, 2),
    color: '#64748B',
    lineHeight: 18.48,
    fontFamily: 'AeonikRegular',
  },
  addButton: {
    padding: 8,
  },
});
