import { PERMISSIONS, RESULTS, PermissionStatus, request } from 'react-native-permissions';

import { Alert } from 'react-native';

const useBiometrics = () => {
  const requestBiometricPermission = async (): Promise<PermissionStatus | undefined> => {
    try {
      const status = await request(PERMISSIONS.IOS.FACE_ID);

      switch (status) {
        case RESULTS.UNAVAILABLE:
          console.log('This feature is not available (on this device / in this context)');
          break;
        case RESULTS.DENIED:
          console.log('The permission has been denied but can be requested again');
          Alert.alert('Biometric permission not granted!', 'Please grant FaceId permission to continue.');
          break;
        case RESULTS.BLOCKED:
          console.log('The permission is denied and not requestable anymore');
          Alert.alert('Biometric permission blocked!', 'Please grant FaceId permission to continue.');
          break;
        case RESULTS.GRANTED:
          console.log('The permission is granted');
          break;
        case RESULTS.LIMITED:
          console.log('The permission is granted but with limitations');
          break;
        default:
          console.log('Unknown permission result');
      }

      return status;
    } catch (error) {
      console.error('Permission request failed:', error);
    }
  };

  return { requestBiometricPermission };
};

export default useBiometrics;
