import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Platform, TextInput, StatusBar as RNStatusBar, Alert, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useLoginWithEmail, usePrivy } from '@privy-io/expo';

import { LQDButton } from '@/components';
import useSystemFunctions from '@/hooks/useSystemFunctions';
import { adjustFontSizeForIOS, emailIsValid } from '@/utils/helpers';
import { useSmartAccountActions } from '@/store/smartAccount/actions';
import api from '@/init/api';

const SignupEmail = () => {
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

  const isValid = emailIsValid(email);

  const handleTagChange = (value: string) => {
    setEmail(value);
  };

  const onSubmit = async () => {
    try {
      setLoading(true);

      const options = await api.getRegistrationOptions(email as string);

      const response = await sendCode({ email });
      if (!response.success) return Alert.alert('An error occurred. Please check your email and try again.');

      await updateRegistrationOptions(options);
      router.push({ pathname: '/(signup)/verify-email', params: { email } });
    } catch (error) {
      console.log('error', error);
      Alert.alert(`User with email ${email} already exist! Please login`, '', [
        {
          text: 'Login',
          onPress: () => router.push('/(login)'),
        },
      ]);
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

      <View style={styles.container}>
        <View style={styles.topContainer}>
          <View style={styles.description}>
            <Text style={styles.title}>Enter your email</Text>
            <Text style={styles.subtitle}>enter an email, preferrably an active one</Text>
          </View>

          <View style={styles.inputContainer}>
            <View style={[styles.inputWrapper]}>
              <TextInput
                style={[styles.input]}
                value={email}
                onChangeText={handleTagChange}
                placeholder="email"
                placeholderTextColor="#94A3B8"
                autoCapitalize="none"
                autoComplete="off"
                autoCorrect={false}
                spellCheck={false}
                autoFocus={true}
              />
            </View>
          </View>

          <TouchableOpacity onPress={() => router.push('/(login)')}>
            <Text style={styles.subtitle}>Already have an account? Login</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <LQDButton title="Continue" onPress={onSubmit} variant="secondary" disabled={!isValid} loading={loading} />
        </View>
      </View>
    </View>
  );
};

export default SignupEmail;

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
    lineHeight: 19.84,
    fontWeight: '400',
    fontFamily: 'AeonikRegular',
  },

  inputContainer: {
    gap: 6,
  },

  labelText: {
    fontSize: adjustFontSizeForIOS(13, 2),
    lineHeight: 16.12,
  },

  inputWrapper: {
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#94A3B8',
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

  buttonContainer: {
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
});
