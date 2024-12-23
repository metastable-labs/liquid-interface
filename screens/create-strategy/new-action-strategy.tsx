import React, { useState } from 'react';
import { Platform, StyleSheet, StatusBar as RNStatusBar, Text, TouchableOpacity, View } from 'react-native';
import { adjustFontSizeForIOS } from '@/utils/helpers';
import { ArrowDropdownDownIcon } from '@/assets/icons';
import { LQDActionCard, LQDAssetSelection, LQDBottomSheet, LQDButton, LQDProtocolCard, LQDTokenImage } from '@/components';
import useSystemFunctions from '@/hooks/useSystemFunctions';
import useAppActions from '@/store/app/actions';
import { TokenItem } from '@/store/account/types';
import { protocolList } from '@/constants/addresses';
import ICONS from '@/constants/icons';
import { actionList } from '../discover/dummy';

const ActionItem = ({ title, label, icon, action }: IActionItem) => {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity onPress={action} style={styles.actionItem}>
        <View style={styles.iconFlex}>
          {icon && ICONS[icon]}
          <Text style={styles.actionText}>{title}</Text>
        </View>
        <View style={styles.addButton}>
          <ArrowDropdownDownIcon fill="#64748B" height={18} width={18} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const AssetItem = ({ title, label, logoUrl, action }: IActionItem) => {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity onPress={action} style={styles.actionItem}>
        <View style={styles.iconFlex}>
          <LQDTokenImage iconURL={logoUrl} />
          <Text style={styles.actionText}>{title}</Text>
        </View>

        <View style={styles.addButton}>
          <ArrowDropdownDownIcon fill="#64748B" height={18} width={18} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const NewAction = () => {
  const { router, appState } = useSystemFunctions();
  const { handleStrategyActions } = useAppActions();
  const [selectedProtocol, setSelectedProtocol] = useState<ProtocolItem>(protocolList[0]);
  const [selectedAction, setSelectedAction] = useState<IActionsListItem>(actionList[0]);
  const [selectedAssets, setSelectedAssets] = useState<TokenItem[]>([]);

  const [showProtocal, setShowProtocal] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const [showFirstAssets, setShowFirstAssets] = useState(false);
  const [showSecondAssets, setShowSecondAssets] = useState(false);

  const { strategyActions } = appState;

  const openProtocal = () => {
    setShowProtocal((prev) => !prev);
  };

  const openActions = () => {
    setShowActions((prev) => !prev);
  };

  const handleShowFirstAsset = () => {
    setShowFirstAssets((prev) => !prev);
  };

  const handleShowSecondAsset = () => {
    setShowSecondAssets((prev) => !prev);
  };

  const handleFirstAsset = (data: TokenItem) => {
    const newAssets = [...selectedAssets];
    newAssets[0] = data;
    setSelectedAssets(newAssets);
  };

  const handleSecondAsset = (data: TokenItem) => {
    const newAssets = [...selectedAssets];
    newAssets[1] = data;
    setSelectedAssets(newAssets);
  };

  const handleAddNewStrategyAction = () => {
    const currentActions = [...strategyActions];

    const selectedAssetsAddresses = selectedAssets.map((asset) => asset.address);

    const newAction: StrategyAction = {
      action: selectedAction.variant,
      assetsIn: selectedAssetsAddresses,
      protocol: selectedProtocol,
    };

    handleStrategyActions([...currentActions, newAction]);
    router.back();
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.username}>Njoku’s Aerodrome wealth builder</Text>

        <View style={styles.itemWrapper}>
          <ActionItem icon={selectedProtocol.icon} title={selectedProtocol.title} label="Protocol" action={openProtocal} />
          <ActionItem icon={selectedAction.variant} title={selectedAction.title} label="Actions" action={openActions} />
          <AssetItem logoUrl={selectedAssets[0]?.logoUrl} title={selectedAssets[0]?.symbol} label="Asset" action={handleShowFirstAsset} />

          {selectedProtocol.title === 'Aerodrome' && selectedAction.variant === 'deposit' && (
            <AssetItem
              logoUrl={selectedAssets[1]?.logoUrl}
              title={selectedAssets[1]?.symbol}
              label="Asset 2"
              action={handleShowSecondAsset}
            />
          )}
        </View>
      </View>

      <View style={styles.bottomWrapper}>
        <LQDButton onPress={handleAddNewStrategyAction} title="Add" variant="secondary" />
      </View>

      <LQDBottomSheet show={showProtocal} variant="primary" onClose={openProtocal}>
        <View style={styles.protocalContainerStyle}>
          {protocolList.map((protocol, index) => (
            <LQDProtocolCard
              key={index}
              variant={protocol.icon}
              selected={selectedProtocol.id === protocol.id}
              protocol={protocol}
              onSelect={() => {
                setSelectedProtocol(protocol);
                openProtocal();
              }}
            />
          ))}
        </View>
      </LQDBottomSheet>

      <LQDBottomSheet show={showActions} variant="primary" onClose={openActions}>
        <View style={styles.protocalContainerStyle}>
          {actionList.map((action, index) => (
            <LQDActionCard
              key={index}
              variant={action.variant}
              selected={selectedAction.id === action.id}
              actions={action}
              onSelect={() => {
                setSelectedAction({ ...action });
                openActions();
              }}
            />
          ))}
        </View>
      </LQDBottomSheet>

      <LQDAssetSelection
        key={1}
        close={handleShowFirstAsset}
        setAsset={handleFirstAsset}
        show={showFirstAssets}
        title="Select token"
        selectedAsset={selectedAssets[0]}
      />

      <LQDAssetSelection
        key={2}
        close={handleShowSecondAsset}
        setAsset={handleSecondAsset}
        show={showSecondAssets}
        title="Select token"
        selectedAsset={selectedAssets[1]}
      />
    </View>
  );
};

export default NewAction;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'space-between',
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
  bottomWrapper: { paddingHorizontal: 20, marginBottom: 50 },
  iconFlex: { flexDirection: 'row', gap: 10, flex: 1 },
});
