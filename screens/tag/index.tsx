import { useState } from 'react';
import { View, Text, StyleSheet, Platform, StatusBar, TextInput } from 'react-native';

import { LQDButton } from '@/components';
import useSystemFunctions from '@/hooks/useSystemFunctions';
import { adjustFontSizeForIOS } from '@/utils/helpers';
import { useUserActions } from '@/store/user/actions';
import { useSmartAccountActions } from '@/store/smartAccount/actions';
import { useDebouncedEffect } from '@/hooks/useDebouncedEffect';
import api from '@/init/api';

const TAG_DEBOUNCE_DELAY = 2000;

const Tag = () => {
  const [tag, setTag] = useState('');
  const [formState, setFormState] = useState<TagFormState>('base');
  const { router } = useSystemFunctions();

  const disableButton = !tag || tag.length < 3 || formState === 'error';
  const loadingButton = formState === 'loading';

  const stateMessage = {
    base: 'Username must be at least 3 characters',
    loading: 'Checking availability...',
    error: 'This username is already taken',
    success: 'This username is available',
  };

  const handleTagChange = (value: string) => {
    setFormState('loading');
    setTag(value);
  };

  const { setUser } = useUserActions();
  const { setRegistrationOptions } = useSmartAccountActions();

  const onSubmit = () => {
    if (formState !== 'success') return;

    console.log('tag', tag);
    router.replace('/setup');
  };

  useDebouncedEffect(
    function checkTagAvailability() {
      let isCancelled = false;

      (async () => {
        if (tag === '' || tag.length < 3) {
          setFormState('base');
          return;
        }

        try {
          const options = await api.getRegistrationOptions(tag);
          console.log('registrationOptions', options);

          if (isCancelled) return;

          const { user } = options;
          setUser(user);

          setRegistrationOptions(options);

          setFormState('success');
        } catch (error) {
          if (isCancelled) return;

          // TODO: report error to Bugsnag or Sentry
          console.log('error', error);
          setFormState('error');
        }
      })();

      return () => {
        isCancelled = true;
      };
    },
    [tag],
    TAG_DEBOUNCE_DELAY
  );

  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <View style={styles.description}>
            <Text style={styles.title}>Set up a Liquid tag</Text>
            <Text style={styles.subtitle}>Create a unique identifier for your Liquid account</Text>
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.labelContainer}>
              <Text style={[styles.labelText, styles.primaryLabel]}>Username</Text>
              <Text style={[styles.labelText, styles.secondaryLabel]}>(Liquid tag)</Text>
            </View>

            <View style={[styles.inputWrapper, styles[`${formState}InputWrapper`]]}>
              <TextInput
                style={[styles.input, styles[`${formState}Input`]]}
                value={tag}
                onChangeText={handleTagChange}
                placeholder="yourtag"
                placeholderTextColor="#94A3B8"
                autoCapitalize="none"
                autoComplete="off"
                autoCorrect={false}
                spellCheck={false}
                autoFocus={true}
              />
            </View>

            <Text style={[styles.stateMessage, styles[`${formState}StateMessage`]]}>{stateMessage[formState]}</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <LQDButton title="Continue" onPress={onSubmit} variant="secondary" disabled={disableButton} loading={loadingButton} />
        </View>
      </View>
    </View>
  );
};

export default Tag;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 54,
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
    gap: 8,
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

  labelContainer: {
    flexDirection: 'row',
    gap: 2,
    alignItems: 'center',
  },

  labelText: {
    fontSize: adjustFontSizeForIOS(13, 2),
    lineHeight: 16.12,
  },

  primaryLabel: {
    color: '#1E293B',
    fontWeight: '500',
    fontFamily: 'AeonikMedium',
  },

  secondaryLabel: {
    color: '#64748B',
  },

  inputWrapper: {
    borderRadius: 16,
    borderWidth: 2,
  },

  baseInputWrapper: {
    borderColor: 'rgba(15, 23, 42, 0.01)',
  },

  errorInputWrapper: {
    borderColor: 'rgba(223, 28, 65, 0.12)',
  },

  successInputWrapper: {
    borderColor: 'rgba(109, 230, 79, 0.12)',
  },

  loadingInputWrapper: {
    borderColor: 'rgba(15, 23, 42, 0.01)',
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

  baseInput: {
    borderColor: '#EAEEF4',
  },

  errorInput: {
    borderColor: '#AF1D38',
    color: '#AF1D38',
  },

  successInput: {
    borderColor: '#1A8860',
  },

  loadingInput: {
    borderColor: '#EAEEF4',
  },

  stateMessage: {
    fontSize: adjustFontSizeForIOS(12, 2),
    lineHeight: 15.84,
    fontFamily: 'AeonikRegular',
  },

  baseStateMessage: {
    color: '#64748B',
  },

  errorStateMessage: {
    color: '#AF1D38',
  },

  successStateMessage: {
    color: '#1A8860',
  },

  loadingStateMessage: {
    color: '#64748B',
  },

  buttonContainer: {
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
});
