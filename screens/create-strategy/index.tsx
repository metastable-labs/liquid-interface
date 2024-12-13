import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { LQDButton, LQDInput } from '@/components';
import { yupResolver } from '@hookform/resolvers/yup';
import useAppActions from '@/store/app/actions';
import { adjustFontSizeForIOS } from '@/utils/helpers';
import useSystemFunctions from '@/hooks/useSystemFunctions';

import Actions from './actions';
import { AerodromeIcon, BorrowIcon, CuratorIcon, DepositIcon, MoonWellIcon, MorphoIcon, StakeIcon, SupplyIcon } from '@/assets/icons';

const schema = yup.object().shape({
  name: yup.string().required('Strategy name is required'),
  description: yup.string().required('Description is required'),
});

interface CreateStrategyForm {
  name: string;
  description: string;
}

const CreateStrategy = () => {
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<CreateStrategyForm>({
    mode: 'onSubmit',
    resolver: yupResolver(schema),
  });
  const { searchIsFocused: focusSearch, showSearch } = useAppActions();
  const { router, appState } = useSystemFunctions();
  const { handleStrategyActions } = useAppActions();

  const { strategyActions } = appState;

  const focusInput = () => {
    focusSearch(true);
  };

  const blurInput = () => {
    focusSearch(false);
  };

  const navigateToNewAction = () => {
    router.push('/new-action-strategy');
  };

  const navigateToPreview = (data: CreateStrategyForm) => {
    router.push({
      pathname: '/preview-strategy',
      params: { name: data.name, description: data.description },
    });
  };

  const handleCancel = () => {
    handleStrategyActions([]);
    router.back();
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <LQDInput
          control={control}
          name="name"
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
          <Actions list={strategyActions} setList={handleStrategyActions} addNewAction={navigateToNewAction} />
        </View>
      </ScrollView>

      <View style={styles.btnBottomWrapper}>
        <LQDButton disabled={!isValid} onPress={handleSubmit(navigateToPreview)} title="Continue" variant="secondary" />

        <Pressable onPress={handleCancel}>
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
    gap: 50,
  },
  scrollContainer: {
    flex: 1,
    paddingBottom: 150,
  },
  cancel: {
    fontSize: adjustFontSizeForIOS(16, 2),
    lineHeight: 16,
    color: '#64748B',
    fontFamily: 'QuantaGroteskProSemiBold',
    fontWeight: '600',
    alignSelf: 'center',
  },
  btnBottomWrapper: {
    justifyContent: 'flex-end',
    marginBottom: 40,
    gap: 30,
  },
});
