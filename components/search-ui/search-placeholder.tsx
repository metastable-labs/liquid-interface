import { SearchIcon, SettingsIcon } from '@/assets/icons';
import useSystemFunctions from '@/hooks/useSystemFunctions';
import useAppActions from '@/store/app/actions';
import { adjustFontSizeForIOS } from '@/utils/helpers';
import { Platform, StyleSheet, Text, TouchableOpacity, View, StatusBar as RNStatusBar } from 'react-native';
import LQShrimeLoader from '../loader';

const SearchPlaceholder = ({ loading }: { loading?: boolean }) => {
  const { router } = useSystemFunctions();
  const { searchIsFocused: focusSearch, showSearch } = useAppActions();

  const focusInput = () => {
    focusSearch(true);
    showSearch(true);
  };

  if (loading) {
    return (
      <View style={styles.searchLoader}>
        <LQShrimeLoader style={styles.loaderOne} />
        <LQShrimeLoader style={styles.loaderTwo} />
        <LQShrimeLoader style={styles.loaderOne} />
      </View>
    );
  }

  return (
    <View style={styles.searchInnerWrapper}>
      <View style={styles.inputWrapper}>
        <TouchableOpacity style={styles.inputContainer} onPress={focusInput}>
          <SearchIcon />

          <View>
            <Text style={styles.inputPlaceholderText}>Search...</Text>
          </View>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => router.navigate('/(settings)')}>
        <SettingsIcon />
      </TouchableOpacity>
    </View>
  );
};

export default SearchPlaceholder;

const styles = StyleSheet.create({
  searchInnerWrapper: {
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 20,
    paddingBottom: Platform.OS === 'android' ? -(RNStatusBar.currentHeight || 0) : -48,
    flexDirection: 'row',
    alignItems: 'center',
  },

  inputWrapper: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#fff',
    width: '90%',
  },

  inputContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: 'row',
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
    width: '100%',
  },

  inputPlaceholderText: {
    fontSize: adjustFontSizeForIOS(14, 2),
    lineHeight: 18.48,
    color: '#94A3B8',
    fontFamily: 'AeonikRegular',
  },
  searchLoader: {
    flexDirection: 'row',
    gap: 30,
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 20,
    paddingBottom: Platform.OS === 'android' ? -(RNStatusBar.currentHeight || 0) : -48,
  },
  loaderOne: { height: 24, width: 24, borderRadius: 16 },
  loaderTwo: { height: 35, width: 50, borderRadius: 6, flex: 1 },
});
