import { forwardRef, useImperativeHandle, useRef } from 'react';
import { Controller, FieldValues } from 'react-hook-form';
import { TextInput, Text, View, StyleSheet } from 'react-native';

import { SearchIcon } from '@/assets/icons';
import { adjustFontSizeForIOS } from '@/utils/helpers';
import { ILQDInput } from './types';

const LQDInput = <T extends FieldValues>(
  { control, name, inputProps, label, placeholder, rules, variant = 'primary' }: ILQDInput<T>,
  ref: React.Ref<any>
) => {
  const inputRef = useRef<TextInput>(null);

  useImperativeHandle(ref, () => ({
    blur: () => {
      if (inputRef.current) {
        inputRef.current.blur();
      }
    },
  }));

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.inputContainer}>
        {variant === 'search' && <SearchIcon />}

        <Controller
          control={control}
          name={name}
          rules={rules}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              ref={inputRef}
              style={styles.input}
              placeholder={variant === 'search' ? 'Search' : placeholder}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              {...inputProps}
            />
          )}
        />
      </View>
    </View>
  );
};

// Use forwardRef to pass down the ref to LQDInput
export default forwardRef(LQDInput);

const styles = StyleSheet.create({
  container: {},
  inputContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
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
  label: {
    marginBottom: 8,
    fontSize: adjustFontSizeForIOS(16, 2),
    fontWeight: 'bold',
  },
  input: {
    flex: 1,
    fontSize: adjustFontSizeForIOS(14, 2),
    lineHeight: 18.48,
    color: '#94A3B8',
    fontFamily: 'AeonikRegular',
  },
});
