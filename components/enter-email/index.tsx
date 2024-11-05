import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Platform, TextInput, StatusBar as RNStatusBar, Alert, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useLoginWithEmail, usePrivy } from '@privy-io/expo';

import LQDButton from '@/components/button';
import LQDKeyboardWrapper from '@/components/keyboard-wrapper';
import useSystemFunctions from '@/hooks/useSystemFunctions';
import { adjustFontSizeForIOS, emailIsValid } from '@/utils/helpers';
import { useSmartAccountActions } from '@/store/smartAccount/actions';
import api from '@/init/api';

const EnterEmail = ({ isSignup }: Props) => {
  const { router } = useSystemFunctions();
  const { updateRegistrationOptions } = useSmartAccountActions();
  const { logout } = usePrivy();
  const { sendCode } = useLoginWithEmail({
    onError: (error) => {
      console.log('error', error);
    },
  });

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const isValid = emailIsValid(email) && !emailError;

  const handleTagChange = (value: string) => {
    if (emailError) setEmailError(false);
    setEmail(value);
  };

  const handleRegistration = async () => {
    try {
      const options = await api.getRegistrationOptions(email as string);

      const response = await sendCode({ email });
      if (!response.success) return Alert.alert('An error occurred. Please check your email and try again.');

      await updateRegistrationOptions(options);
      return router.push({ pathname: '/(signup)/verify-email', params: { email } });
    } catch (error) {
      setEmailError(true);
    }
  };

  const handleLogin = async () => {
    try {
      const options = await api.getAuthenticationOptions(email as string);

      const response = await sendCode({ email });
      if (!response.success) return Alert.alert('An error occurred. Please check your email and try again.');

      await updateRegistrationOptions(options);
      return router.push({ pathname: '/(login)/verify-email', params: { email } });
    } catch (error) {
      setEmailError(true);
    }
  };

  const onSubmit = async () => {
    try {
      setLoading(true);

      if (isSignup) {
        return handleRegistration();
      }

      return handleLogin();
    } catch (error) {
      setEmailError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    logout();
  }, []);

  return (
    <View style={styles.root}>
      <StatusBar style="inverted" />

      <LQDKeyboardWrapper>
        <View style={styles.container}>
          <View style={styles.topContainer}>
            <Text style={styles.title}>Enter your email</Text>

            <View>
              <View style={[styles.inputWrapper, emailError && styles.inputErrorWrapper]}>
                <TextInput
                  style={[styles.input, emailError && styles.inputError]}
                  value={email}
                  onChangeText={handleTagChange}
                  placeholder="email"
                  placeholderTextColor="#94A3B8"
                  autoComplete="off"
                  autoCorrect={false}
                  autoCapitalize="none"
                  spellCheck={false}
                  autoFocus={true}
                  inputMode="email"
                />
              </View>

              {emailError && isSignup && <Text style={styles.errorText}>Email already exists, proceed to sign in</Text>}
              {emailError && !isSignup && <Text style={styles.errorText}>Email does not exist, proceed to sign up</Text>}
            </View>
          </View>

          <View style={styles.bottomContainer}>
            {isSignup && (
              <View style={styles.disclaimerContainer}>
                <Text style={styles.disclaimerText}>By clicking continue, you agree to Liquid’s </Text>
                <Text style={[styles.disclaimerText, styles.disclaimerTextBold]}>Terms of Service</Text>
                <Text style={styles.disclaimerText}> and </Text>
                <Text style={[styles.disclaimerText, styles.disclaimerTextBold]}>Privacy Policy</Text>
              </View>
            )}

            <LQDButton title="Continue" onPress={onSubmit} variant="secondary" disabled={!isValid} loading={loading} />

            {isSignup && (
              <TouchableOpacity onPress={() => router.push('/(login)')} style={styles.actionWrapper}>
                <Text style={styles.actionText}>Have an account already? </Text>
                <Text style={[styles.actionText, styles.actionTextBold]}>Log In</Text>
              </TouchableOpacity>
            )}

            {!isSignup && (
              <TouchableOpacity onPress={() => router.push('/(signup)')} style={styles.actionWrapper}>
                <Text style={styles.actionText}>New to Liquid? </Text>
                <Text style={[styles.actionText, styles.actionTextBold]}>Sign Up</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </LQDKeyboardWrapper>
    </View>
  );
};

export default EnterEmail;

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

  title: {
    color: '#181E00',
    fontSize: adjustFontSizeForIOS(24, 3),
    lineHeight: 26.88,
    letterSpacing: -0.6,
    fontWeight: '500',
    fontFamily: 'AeonikMedium',
  },

  labelText: {
    fontSize: adjustFontSizeForIOS(13, 2),
    lineHeight: 16.12,
  },

  inputWrapper: {
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#94A3B8',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },

  inputErrorWrapper: {
    borderColor: '#DF1C41',
  },

  input: {
    alignSelf: 'stretch',
    padding: 12,
    backgroundColor: '#FFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'transparent',
    color: '#020617',
    fontSize: adjustFontSizeForIOS(14, 2),
    fontWeight: '500',
    fontFamily: 'AeonikMedium',
  },

  inputError: {
    color: '#DF1C41',
  },

  bottomContainer: {
    paddingHorizontal: 8,
    paddingTop: 12,
  },

  disclaimerContainer: {
    paddingHorizontal: 16,
    paddingBottom: 23,
    flexDirection: 'row',
    textAlign: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },

  errorText: {
    fontSize: adjustFontSizeForIOS(12, 2),
    color: '#DF1C41',
    fontFamily: 'AeonikRegular',
    paddingTop: 8,
    paddingHorizontal: 3,
  },

  disclaimerText: {
    fontSize: adjustFontSizeForIOS(12, 2),
    color: '#475467',
    fontFamily: 'AeonikRegular',
    lineHeight: 21,
  },

  disclaimerTextBold: {
    fontWeight: '700',
    fontFamily: 'AeonikBold',
  },

  actionWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 14,
  },

  actionText: {
    fontSize: adjustFontSizeForIOS(14, 2),
    color: '#475467',
    fontFamily: 'AeonikRegular',
  },

  actionTextBold: {
    fontSize: adjustFontSizeForIOS(14.5, 2),
    fontWeight: '700',
    fontFamily: 'AeonikBold',
    textDecorationLine: 'underline',
  },
});
