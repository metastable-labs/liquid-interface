import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Platform, StatusBar, TextInput } from 'react-native';
import Animated from 'react-native-reanimated';

import { LQDButton } from '@/components';
import useSystemFunctions from '@/hooks/useSystemFunctions';

const dummyUsernames = ['bambam', 'meister', 'njoku', 'static', 'choco'];

const Tag = () => {
  const [tag, setTag] = useState('');
  const [formState, setFormState] = useState<TagFormState>('base');
  const { router } = useSystemFunctions();

  const disableButton = !tag || tag.length < 3 || formState === 'error';

  const stateMessage = {
    base: 'Username must be at least 3 characters',
    error: 'This username is already taken',
    success: 'This username is available',
  };

  const handleTagChange = (value: string) => {
    setTag(value);
  };

  const onSubmit = () => {
    console.log('tag', tag);
    if (tag.length < 3) return;
    router.replace('/setup');
  };

  useEffect(() => {
    if (tag === '' || tag.length < 3) {
      setFormState('base');
    } else if (dummyUsernames.includes(tag)) {
      setFormState('error');
    } else {
      setFormState('success');
    }
  }, [tag]);

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
                placeholder="@yourtag"
                placeholderTextColor="#94A3B8"
                autoCapitalize="none"
              />
            </View>

            <Text style={[styles.stateMessage, styles[`${formState}StateMessage`]]}>{stateMessage[formState]}</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <LQDButton title="Continue" onPress={onSubmit} variant="secondary" disabled={disableButton} />
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
    fontSize: 24,
    lineHeight: 26.88,
    letterSpacing: -0.6,
    fontWeight: '500',
    fontFamily: 'AeonikMedium',
  },

  subtitle: {
    color: '#475467',
    fontSize: 16,
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
    fontSize: 13,
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

  input: {
    alignSelf: 'stretch',
    padding: 12,
    backgroundColor: '#FFF',
    borderRadius: 16,
    borderWidth: 1,
    color: '#020617',
    fontSize: 14,
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

  stateMessage: {
    fontSize: 12,
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

  buttonContainer: {
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
});
