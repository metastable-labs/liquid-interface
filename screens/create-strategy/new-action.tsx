import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { adjustFontSizeForIOS } from '@/utils/helpers';
import { PlusIcon } from '@/assets/icons';
import { LQDActionCard, LQDBottomSheet, LQDFlatlist, LQDProtocolCard } from '@/components';
import { actionList, protocolList } from '../discover/dummy';

const ActionItem = ({ text = 'uytf', action }: { text: string; action: () => void }) => {
  return (
    <View style={styles.actionItem}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: 1,
          borderRadius: 16,
          borderColor: '#EAEEF4',
          paddingHorizontal: 16,
          paddingVertical: 5,
        }}
      >
        <Text style={styles.actionText}>{text}</Text>
        <TouchableOpacity onPress={action} style={styles.addButton}>
          <PlusIcon fill="#64748B" height={18} width={18} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const NewAction = () => {
  const [selectedProtocal, setSelectedProtocal] = useState('');
  const [selectedAction, setSelectedAction] = useState('');
  const [selectedAsset, setSelectedAsset] = useState('');

  const [showProtocal, setShowProtocal] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const [showAssets, setShowAssets] = useState(false);

  const openProtocal = () => {
    setShowProtocal((prev) => !prev);
  };

  const openActions = () => {
    setShowActions((prev) => !prev);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.username}>Njoku’s Aerodrome wealth builder</Text>

      <View style={styles.itemWrapper}>
        <ActionItem />
      </View>

      <LQDBottomSheet show={showProtocal} title="" variant="primary" onClose={openProtocal}>
        <LQDFlatlist
          data={protocolList}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <LQDProtocolCard selected={selectedProtocal === item.id} protocol={item} action={() => setSelectedProtocal(item.id)} />
          )}
          keyExtractor={(_, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.protocalContainerStyle}
        />
      </LQDBottomSheet>
      <LQDBottomSheet show={showActions} title="" variant="primary" onClose={openActions}>
        <LQDFlatlist
          data={actionList}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <LQDActionCard
              variant={item.icon}
              selected={selectedAction === item.id}
              actions={item}
              action={() => setSelectedAction(item.id)}
            />
          )}
          keyExtractor={(_, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.protocalContainerStyle}
        />
      </LQDBottomSheet>
    </View>
  );
};

export default NewAction;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 16,
  },

  itemWrapper: {
    gap: 12,
    backgroundColor: 'green',
    borderWidth: 1,
    borderColor: '#F1F5F9',
    padding: 20,
    borderRadius: 18,
  },

  username: {
    fontWeight: '500',
    marginBottom: 16,
    color: '#64748B',
    fontSize: adjustFontSizeForIOS(13, 2),
    lineHeight: 18.48,
    fontFamily: 'AeonikMedium',
  },

  actionText: {
    flex: 1,
    fontSize: adjustFontSizeForIOS(13, 2),
    color: '#334155',
    lineHeight: 18.48,
    fontFamily: 'AeonikRegular',
  },
  addButton: {
    padding: 8,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  protocalContainerStyle: { gap: 20, paddingBottom: 50 },
});
