import { useState } from 'react';
import { View, Text, StyleSheet, Platform, StatusBar as RNStatusBar, ViewStyle, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { OtpInput } from 'react-native-otp-entry';
import { useLocalSearchParams } from 'expo-router';
import { useLoginWithEmail } from '@privy-io/expo';

import { LQDButton } from '@/components';
import useSystemFunctions from '@/hooks/useSystemFunctions';
import { adjustFontSizeForIOS } from '@/utils/helpers';

const LoginVerifyEmail = () => {
  const { router } = useSystemFunctions();
  const params = useLocalSearchParams();

  const { loginWithCode } = useLoginWithEmail({
    onError: (error) => {
      console.log('error', error.message);
      setLoading(false);
      Alert.alert('An error occurred. Please check your email and try again.');
    },
    onLoginSuccess: async () => {
      router.push('/setup');
    },
  });

  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const email = params?.email;

  const disableButton = !otp || otp.length < 6;

  const onSubmit = async () => {
    try {
      setLoading(true);

      await loginWithCode({ code: otp, email: email as string });
    } catch (error) {
      setError(true);
    }
  };

  return (
    <View style={styles.root}>
      <StatusBar style="inverted" />

      <View style={styles.container}>
        <View style={styles.topContainer}>
          <View style={styles.description}>
            <Text style={styles.title}>Verify your email</Text>
            <View>
              <Text style={styles.subtitle}>Enter the 6-digit code sent to you at</Text>
              <Text style={[styles.subtitle, styles.subtitleBold]}>{email}</Text>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <OtpInput
              numberOfDigits={6}
              focusColor="#1A8860"
              focusStickBlinkingDuration={500}
              onTextChange={(text) => setOtp(text)}
              onFilled={(text) => console.log(`OTP is ${text}`)}
              textInputProps={{
                accessibilityLabel: 'One-Time Password',
              }}
              theme={{
                pinCodeContainerStyle: {
                  width: 45,
                  height: 45,
                  borderColor: error ? '#AF1D38' : '#EAEEF4',
                },
                pinCodeTextStyle: styles.pinCodeTextStyle as ViewStyle,
                filledPinCodeContainerStyle: styles.filledPinCodeContainerStyle as ViewStyle,
              }}
            />
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <LQDButton title="Continue" onPress={onSubmit} variant="secondary" disabled={disableButton} loading={loading} />
        </View>
      </View>
    </View>
  );
};

export default LoginVerifyEmail;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 54,
    backgroundColor: '#FFF',
  },

  container: {
    paddingTop: 46,
    paddingBottom: Platform.OS === 'ios' ? 36 : 16,
    paddingHorizontal: 16,
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
  },

  topContainer: {
    gap: 32,
  },

  description: {
    gap: 16,
  },

  title: {
    color: '#181E00',
    fontSize: adjustFontSizeForIOS(24, 3),
    lineHeight: 26.88,
    letterSpacing: -0.6,
    fontWeight: '500',
    fontFamily: 'AeonikMedium',
  },

  subtitle: {
    color: '#475467',
    fontSize: adjustFontSizeForIOS(16, 2),
    lineHeight: 25,
    fontWeight: '400',
    fontFamily: 'AeonikRegular',
  },

  subtitleBold: {
    color: '#161717',
    fontWeight: '700',
    fontFamily: 'AeonikBold',
  },

  inputContainer: {
    gap: 6,
  },

  labelText: {
    fontSize: adjustFontSizeForIOS(13, 2),
    lineHeight: 16.12,
  },

  input: {
    alignSelf: 'stretch',
    padding: 12,
    backgroundColor: '#FFF',
    borderRadius: 16,
    borderWidth: 1,
    color: '#020617',
    fontSize: adjustFontSizeForIOS(14, 2),
    lineHeight: 18.48,
    fontFamily: 'AeonikRegular',
  },

  buttonContainer: {
    paddingHorizontal: 8,
    paddingVertical: 12,
  },

  pinCodeTextStyle: {
    fontSize: adjustFontSizeForIOS(25, 2),
    fontWeight: '700',
    fontFamily: 'AeonikBold',
  },

  filledPinCodeContainerStyle: {
    backgroundColor: '#f2f3f5',
  },
});
