import React from 'react';
import { Controller, FieldValues } from 'react-hook-form';
import { TextInput, Text, View, StyleSheet, Pressable } from 'react-native';

import { CloseIcon, SearchIcon } from '@/assets/icons';
import { adjustFontSizeForIOS } from '@/utils/helpers';
import { ILQDInput } from './types';

const LQDInput = <T extends FieldValues>({
  control,
  name,
  inputProps,
  label,
  placeholder,
  rules,
  variant = 'primary',
  iconAction,
  isTextarea = false,
  numberOfLines = 4,
}: ILQDInput<T>) => {
  const iconsMap = {
    search: <SearchIcon />,
    close: <CloseIcon fill="#94A3B8" />,
    primary: null,
    secondary: null,
  };

  const icon = iconsMap[variant] || null;

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.inputContainer, isTextarea && styles.textareaContainer]}>
        <Pressable onPress={iconAction}>{icon}</Pressable>

        <Controller
          control={control}
          name={name}
          rules={rules}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.input, isTextarea && styles.textarea]}
              placeholder={variant === 'search' ? 'Search' : placeholder}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              multiline={isTextarea}
              numberOfLines={isTextarea ? numberOfLines : 1}
              textAlignVertical={isTextarea ? 'top' : 'center'}
              {...inputProps}
            />
          )}
        />
      </View>
    </View>
  );
};

export default LQDInput;

const styles = StyleSheet.create({
  container: {},
  inputContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 13,
    borderColor: '#EAEEF4',
    borderWidth: 1,
    shadowColor: 'rgba(15, 23, 42, 0.04)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 1,
    backgroundColor: '#fff',
  },
  textareaContainer: {
    alignItems: 'flex-start',
    paddingVertical: 8,
  },
  label: {
    marginBottom: 8,
    fontSize: adjustFontSizeForIOS(13, 2),
    fontWeight: '500',
    fontFamily: 'AeonikMedium',
  },
  input: {
    flex: 1,
    fontSize: adjustFontSizeForIOS(14, 2),
    lineHeight: 18.48,
    color: '#94A3B8',
    fontWeight: 400,
    fontFamily: 'Aeonik',
    marginLeft: 10,
  },
  textarea: {
    textAlignVertical: 'top',
    paddingTop: 8,
    height: 80,
  },
});
