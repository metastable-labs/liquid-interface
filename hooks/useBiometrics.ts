import * as LocalAuthentication from 'expo-local-authentication';
import { Alert } from 'react-native';

const useBiometrics = () => {
  const isBiometricsAvailable = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const hasEnrolled = await LocalAuthentication.isEnrolledAsync();

    return hasHardware && hasEnrolled;
  };

  const authenticateBiometrics = async () => {
    try {
      const biometricsAlreadyGranted = await isBiometricsAvailable();

      if (biometricsAlreadyGranted) {
        return true;
      }

      const result = await LocalAuthentication.authenticateAsync();

      if (result.success) {
        return true;
      } else {
        Alert.alert('Biometric permission not granted!', 'Please grant FaceId permission to continue.');

        return false;
      }
    } catch (error) {
      return false;
    }
  };

  return { isBiometricsAvailable, authenticateBiometrics };
};

export default useBiometrics;
