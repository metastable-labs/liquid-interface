import { PERMISSIONS, RESULTS, PermissionStatus, request, check, openSettings } from 'react-native-permissions';
import { Alert, Platform } from 'react-native';

const showBlockedAlert = () => {
  if (Platform.OS === 'ios') {
    return Alert.alert('Biometric permission blocked!', 'Please unblock FaceId permission to continue.', [
      {
        text: 'Settings',
        onPress: () => openSettings(),
      },
    ]);
  }

  Alert.alert('Biometric permission blocked!', 'Please unblock FaceId permission to continue.');
};

const useBiometrics = () => {
  const requestBiometricPermission = async (): Promise<PermissionStatus | undefined> => {
    try {
      let currentStatus = await check(PERMISSIONS.IOS.FACE_ID);

      switch (currentStatus) {
        case RESULTS.UNAVAILABLE:
          Alert.alert(`Biometric permission ${currentStatus}!`, 'Biometric permission is not available on this device.');
          break;

        case RESULTS.DENIED:
          currentStatus = await request(PERMISSIONS.IOS.FACE_ID);

          if (currentStatus == RESULTS.BLOCKED) {
            showBlockedAlert();
          }
          break;

        case RESULTS.BLOCKED:
          showBlockedAlert();
          break;

        case RESULTS.GRANTED:
          break;

        case RESULTS.LIMITED:
          break;
      }

      return currentStatus;
    } catch (error) {
      console.error('Permission request failed:', error);
    }
  };

  return { requestBiometricPermission };
};

export default useBiometrics;
