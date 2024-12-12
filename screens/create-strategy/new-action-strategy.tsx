import { Platform, StyleSheet, StatusBar as RNStatusBar, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { adjustFontSizeForIOS } from '@/utils/helpers';
import {
  AerodromeIcon,
  ArrowDropdownDownIcon,
  BorrowIcon,
  DepositIcon,
  MoonWellIcon,
  MorphoIcon,
  PlusIcon,
  StakeIcon,
  SupplyIcon,
} from '@/assets/icons';
import { LQDActionCard, LQDBottomSheet, LQDButton, LQDFlatlist, LQDImage, LQDProtocolCard, SearchUI } from '@/components';
import { actionList, protocolList } from '../discover/dummy';
import useSystemFunctions from '@/hooks/useSystemFunctions';
import useAppActions from '@/store/app/actions';
import { ActionIconVariant } from '@/components/action-card/types';
import { IProtocolIconVariant } from '@/components/protocol-card/types';

const ActionItem = ({ title = '', label = '', icon = '', action }: IActionItem) => {
  const icons = {
    aerodrome: <AerodromeIcon height={24} width={24} />,
    moonwell: <MoonWellIcon height={24} width={24} />,
    morpho: <MorphoIcon height={24} width={24} />,
    stake: <StakeIcon fill="#1E293B" height={24} width={24} />,
    deposit: <DepositIcon fill="#1E293B" height={24} width={24} />,
    borrow: <BorrowIcon fill="#1E293B" height={24} width={24} />,
    supply: <SupplyIcon />,
  };
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.actionItem}>
        <View style={styles.iconFlex}>
          {icons[icon]}
          <Text style={styles.actionText}>{title}</Text>
        </View>
        <TouchableOpacity onPress={action} style={styles.addButton}>
          <ArrowDropdownDownIcon fill="#64748B" height={18} width={18} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const NewAction = () => {
  const { router, appState } = useSystemFunctions();
  const { searchIsFocused, showSearch } = useAppActions();
  const [selectedProtocal, setSelectedProtocal]: any = useState(protocolList[0]);
  const [selectedAction, setSelectedAction]: any = useState(actionList[0]);
  const [selectedAsset, setSelectedAsset] = useState(protocolList[2]);

  const [showProtocal, setShowProtocal] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const [showAssets, setShowAssets] = useState(false);

  const openProtocal = () => {
    setShowProtocal((prev) => !prev);
  };

  const openActions = () => {
    setShowActions((prev) => !prev);
  };

  const openAssets = () => {
    searchIsFocused(false);
    showSearch(true);
  };

  if (appState.showSearch) {
    return (
      <View style={styles.searchWrapper}>
        <SearchUI />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.username}>Njoku’s Aerodrome wealth builder</Text>

      <View style={styles.itemWrapper}>
        <ActionItem icon={selectedProtocal.icon} title={selectedProtocal.title} label="Protocol" action={openProtocal} />
        <ActionItem icon={selectedAction.icon} title={selectedAction.title} label="Actions" action={openActions} />
        <ActionItem icon={selectedAsset.icon} title={selectedAsset.title} label="Assets" action={openAssets} />
      </View>

      <View style={styles.bottomWrapper}>
        <LQDButton title="Add" variant="secondary" />
      </View>

      <LQDBottomSheet show={showProtocal} title="" variant="primary" onClose={openProtocal}>
        <LQDFlatlist
          data={protocolList}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <LQDProtocolCard
              variant={item.icon as IProtocolIconVariant}
              selected={selectedProtocal.id === item.id}
              protocol={item}
              action={() => setSelectedProtocal(item)}
            />
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
              variant={item.icon as ActionIconVariant}
              selected={selectedAction.id === item.id}
              actions={item}
              action={() => setSelectedAction(item)}
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

  label: {
    fontSize: adjustFontSizeForIOS(13, 2),
    color: '#1E293B',
    lineHeight: 18.48,
    fontFamily: 'AeonikRegular',
    marginBottom: 8,
    fontWeight: '500',
  },

  actionText: {
    fontSize: adjustFontSizeForIOS(13, 2),
    color: '#334155',
    lineHeight: 18.48,
    fontFamily: 'AeonikRegular',
    fontWeight: '400',
  },
  addButton: {
    padding: 8,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 16,
    borderColor: '#EAEEF4',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  protocalContainerStyle: { gap: 20, paddingBottom: 50 },
  searchWrapper: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 20,
    paddingBottom: Platform.OS === 'android' ? -(RNStatusBar.currentHeight || 0) : -48,
  },
  bottomWrapper: { paddingHorizontal: 20, marginTop: 30 },
  iconFlex: { flexDirection: 'row', gap: 10, flex: 1 },
});