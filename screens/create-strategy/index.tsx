import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { LQDButton, LQDInput } from '@/components';
import { useForm } from 'react-hook-form';
import useAppActions from '@/store/app/actions';
import Actions from './actions';
import { adjustFontSizeForIOS } from '@/utils/helpers';
import useSystemFunctions from '@/hooks/useSystemFunctions';

const CreateStrategy = () => {
  const { control, watch } = useForm();
  const { searchIsFocused: focusSearch, showSearch } = useAppActions();
  const { router } = useSystemFunctions();
  const focusInput = () => {
    focusSearch(true);
  };

  const blurInput = () => {
    focusSearch(false);
  };

  const navigateNewAction = () => {
    router.push('/new-action-strategy');
  };

  const navigateToPreview = () => {
    router.push('/preview-strategy');
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <LQDInput
          control={control}
          name="strategyNname"
          rules={{ required: true }}
          label="Strategy Name"
          inputProps={{
            keyboardType: 'default',
            autoCapitalize: 'none',
            placeholder: 'name your strategy',
            onBlur: blurInput,
            onFocus: focusInput,
          }}
          variant="primary"
        />
        <View style={{ marginTop: 20 }}>
          <LQDInput
            control={control}
            name="description"
            rules={{ required: true }}
            label="description"
            isTextarea
            numberOfLines={10}
            inputProps={{
              keyboardType: 'default',
              autoCapitalize: 'none',
              placeholder: 'Describe what your strategy does',
              onBlur: blurInput,
              onFocus: focusInput,
            }}
            variant="primary"
          />
        </View>

        <View style={{ marginTop: 20 }}>
          <Actions action={navigateNewAction} />
        </View>
      </View>

      <View style={styles.btnBottomWrapper}>
        <LQDButton onPress={navigateToPreview} title="Save" variant="secondary" />
        <Pressable>
          <Text style={styles.cancel}>Cancel</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default CreateStrategy;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 16,
  },
  cancel: {
    fontSize: adjustFontSizeForIOS(16, 2),
    lineHeight: 16,
    color: '#64748B',
    fontFamily: 'QuantaGroteskProSemiBold',
    fontWeight: '600',
    alignSelf: 'center',
    marginTop: 20,
  },
  btnBottomWrapper: {
    justifyContent: 'flex-end',
    marginBottom: 25,
  },
});
