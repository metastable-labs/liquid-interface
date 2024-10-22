import { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, TouchableOpacity, TextInput } from 'react-native';
import { useForm } from 'react-hook-form';
import { debounce } from 'lodash';
import Animated from 'react-native-reanimated';

import { CloseIcon } from '@/assets/icons';
import useAppActions from '@/store/app/actions';
import LQDInput from '../input';
import useSystemFunctions from '@/hooks/useSystemFunctions';

const LQDSearch = () => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<TextInput>(null);
  const { control, watch } = useForm();
  const { searchIsFocused: focusSearch } = useAppActions();
  const {
    appState: { searchIsFocused },
    router,
  } = useSystemFunctions();

  const focusInput = () => {
    focusSearch(true);
    router.push('/search');
  };

  const blurInput = () => {
    focusSearch(false);
    if (inputRef.current) {
      inputRef.current?.blur();
    }
  };

  const closeSearch = () => {
    setQuery('');
    blurInput();
    router.canGoBack() && router.back();
  };

  const debouncedSearch = debounce((value) => {
    setQuery(value);
  }, 300);

  const searchValue = watch('search');

  useEffect(() => {
    debouncedSearch(searchValue);
  }, [searchValue]);

  useEffect(() => {
    if (!searchIsFocused) {
      if (inputRef.current) {
        inputRef.current?.blur();
      }
    }
  }, [searchIsFocused]);

  useEffect(() => {
    return () => {
      blurInput();
    };
  }, []);

  return (
    <View style={styles.container}>
      {searchIsFocused && (
        <Animated.View style={{ padding: 2 }}>
          <TouchableOpacity onPress={closeSearch}>
            <CloseIcon />
          </TouchableOpacity>
        </Animated.View>
      )}

      <Animated.View style={{ flex: 1 }}>
        <LQDInput
          ref={inputRef}
          control={control}
          name="search"
          rules={{ required: true }}
          inputProps={{
            keyboardType: 'default',
            autoCapitalize: 'none',
            placeholder: 'Search',
            onBlur: blurInput,
            onFocus: focusInput,
          }}
          variant="search"
        />
      </Animated.View>
    </View>
  );
};

export default LQDSearch;

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
});
