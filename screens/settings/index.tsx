import { CaretRightIcon, LegalIcon, SignoutIcon, SupportIcon } from '@/assets/icons';
import { isDev } from '@/constants/env';
import useSystemFunctions from '@/hooks/useSystemFunctions';
import { useAuth } from '@/providers';
import { useSmartAccountActions } from '@/store/smartAccount/actions';
import { adjustFontSizeForIOS } from '@/utils/helpers';
import { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Settings = () => {
  const { router } = useSystemFunctions();
  const { logout } = useSmartAccountActions();
  const { session } = useAuth();

  const handleSignOut = () => {
    Alert.alert('Sign out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign out',
        style: 'destructive',
        onPress: logout,
      },
    ]);
  };

  const handleSmartAccountSign = async () => {
    if (!session) {
      throw new Error('No smart account found');
    }

    try {
      const messageToSign = {
        message: 'Hello, world!',
        timestamp: Date.now(),
      };

      const signature = await session.signMessage({ message: JSON.stringify(messageToSign) });

      Alert.alert('Signing Successful', 'Signature: ' + signature);
    } catch (error: any) {
      Alert.alert('Signing Failed', error.message + '\n' + error.cause);
    }
  };

  const [actions, setActions] = useState([
    {
      title: 'Legal & Privacy',
      icon: <LegalIcon />,
      onClick: () => router.push('/(settings)/legal-privacy'),
      isNavigable: true,
    },
    {
      title: 'Support',
      icon: <SupportIcon />,
      onClick: () => router.push('/(settings)/support'),
      isNavigable: true,
    },
    {
      title: 'Sign Out',
      icon: <SignoutIcon />,
      onClick: handleSignOut,
      isNavigable: false,
    },
  ]);

  useEffect(function addSignDebugOptionOnDev() {
    if (isDev) {
      setActions([
        ...actions,
        {
          title: 'Sign Message',
          icon: <SignoutIcon />,
          onClick: handleSmartAccountSign,
          isNavigable: false,
        },
      ]);
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.listWrapper}>
        {actions.map((action, index) => (
          <TouchableOpacity key={index} onPress={action.onClick} style={styles.listInnerWrapper}>
            <View style={styles.titleWrapper}>
              {action.icon}
              <Text style={styles.title}>{action.title}</Text>
            </View>

            {action.isNavigable && <CaretRightIcon fill="#0C0507" height={16} width={16} />}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 20,
  },
  listWrapper: {
    marginTop: 60,
    gap: 42,
  },
  listInnerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  title: {
    fontSize: adjustFontSizeForIOS(14, 2),
    color: '#1E293B',
    fontWeight: '500',
    fontFamily: 'AeonikMedium',
  },
});
