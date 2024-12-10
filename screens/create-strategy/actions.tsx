import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import DraggableFlatList, { ScaleDecorator } from 'react-native-draggable-flatlist';
import {
  AerodromeIcon,
  BorrowIcon,
  DepositIcon,
  DragHandleIcon,
  EditProfileIcon,
  MoonWellIcon,
  MorphoIcon,
  PlusIcon,
  StakeIcon,
} from '@/assets/icons';
import { adjustFontSizeForIOS } from '@/utils/helpers';

const ActionItem = ({ title, action }: IActionItem) => {
  return (
    <View style={styles.actionItemContainer}>
      <DragHandleIcon />
      <View style={{ flex: 1 }}>
        <View style={[styles.actionItem]}>
          <View style={styles.innerWrapper}>
            <Text style={styles.actionText}>{title}</Text>
          </View>
          <TouchableOpacity onPress={action} style={styles.addButton}>
            <PlusIcon fill="#64748B" height={20} width={20} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const Actions = ({ action }: IActions) => {
  const [actionList, setActionList] = useState([
    { id: '1', title: 'Stake', icon: 'stake' },
    { id: '2', title: 'Deposit', icon: 'deposit' },
  ]);

  const actions = () => {
    setActionList((prevData) => [...prevData, { id: '1', title: 'Stake', icon: 'stake' }]);
  };

  const icons = {
    stake: <StakeIcon fill="#1E293B" height={24} width={24} />,
    deposit: <DepositIcon fill="#1E293B" height={24} width={24} />,
    borrow: <BorrowIcon fill="#1E293B" height={24} width={24} />,
    supply: null,
  };

  const renderItem = ({ item, drag, isActive }: IActionsRenderItem) => {
    return (
      <View style={styles.dragWrapper}>
        <DragHandleIcon />
        <View style={{ flex: 1 }}>
          <ScaleDecorator>
            <TouchableOpacity
              style={[styles.actionItem, isActive && { backgroundColor: '#F1F5F9' }]}
              onLongPress={drag}
              activeOpacity={0.7}
            >
              <View style={styles.innerWrapper}>
                {icons[item.icon]}
                <Text style={styles.activeActionText}>{item.title}</Text>
              </View>
              <EditProfileIcon fill="#64748B" height={20} width={20} />
            </TouchableOpacity>
          </ScaleDecorator>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Actions</Text>
      <DraggableFlatList
        data={actionList}
        scrollEnabled={false}
        onDragEnd={({ data }) => setActionList(data)}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        ListFooterComponent={() => <ActionItem title="Add new action" action={action} />}
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
    padding: 10,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  actionText: {
    flex: 1,
    fontSize: adjustFontSizeForIOS(13, 2),
    color: '#64748B',
    lineHeight: 18.48,
    fontFamily: 'AeonikRegular',
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 16,
    borderColor: '#EAEEF4',
    gap: 16,
  },
  innerWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  activeActionText: {
    fontSize: adjustFontSizeForIOS(14, 2),
    color: '#0F172A',
    lineHeight: 19.48,
    fontFamily: 'Aeonik',
    fontWeight: '500',
  },
  addButton: {},
  actionItemContainer: { flexDirection: 'row', alignItems: 'center', gap: 10, padding: 10 },
  dragWrapper: { flexDirection: 'row', alignItems: 'center', gap: 10, padding: 10 },
});
