import { useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useForm } from 'react-hook-form';
import Animated from 'react-native-reanimated';

import { CloseIcon } from '@/assets/icons';
import useAppActions from '@/store/app/actions';
import LQDInput from '../input';
import { useDebouncedEffect } from '@/hooks/useDebouncedEffect';
import { adjustFontSizeForIOS } from '@/utils/helpers';

const LQDSearch = ({ setQuery }: { setQuery?: (val: string) => void }) => {
  const { control, watch } = useForm();
  const { searchIsFocused: focusSearch, showSearch } = useAppActions();

  const focusInput = () => {
    focusSearch(true);
  };

  const blurInput = () => {
    focusSearch(false);
  };

  const closeSearch = () => {
    setQuery && setQuery('');
    blurInput();
    showSearch(false);
  };

  const searchValue = watch('search');

  useEffect(() => {
    return () => {
      blurInput();
    };
  }, []);

  useDebouncedEffect(
    function setSearchValue() {
      setQuery && setQuery(searchValue);
    },
    [searchValue],
    300
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={closeSearch}>
        <CloseIcon />
      </TouchableOpacity>

      <Animated.View style={{ flex: 1 }}>
        <LQDInput
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

  inputPlaceholderText: {
    flex: 1,
    fontSize: adjustFontSizeForIOS(14, 2),
    lineHeight: 18.48,
    color: '#94A3B8',
    fontFamily: 'AeonikRegular',
  },
});
