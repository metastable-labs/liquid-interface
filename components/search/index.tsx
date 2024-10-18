import { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import { useForm } from 'react-hook-form';
import { debounce } from 'lodash';
import Animated, { useSharedValue, withTiming, useAnimatedStyle } from 'react-native-reanimated';

import { adjustFontSizeForIOS } from '@/utils/helpers';
import LQDInput from '../input';

const LQDSearch = () => {
  const { control, watch } = useForm();
  const [results, setResults] = useState<string[]>([]);
  const [query, setQuery] = useState('');
  const searchBoxHeight = useSharedValue(0);

  const debouncedSearch = debounce((text: string) => {
    if (text.length >= 2) {
      setResults([`Result for "${text}"`, `Another result for "${text}"`]);
      searchBoxHeight.value = withTiming(200, { duration: 300 });
    } else {
      setResults([]);
      searchBoxHeight.value = withTiming(0, { duration: 300 });
    }
  }, 300);

  useEffect(() => {
    const subscription = watch((value) => {
      const searchText = value.search || '';
      setQuery(searchText);
      debouncedSearch(searchText);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const animatedStyle = useAnimatedStyle(() => ({
    height: searchBoxHeight.value,
    opacity: searchBoxHeight.value > 0 ? withTiming(1) : withTiming(0),
  }));

  return (
    <View style={styles.container}>
      <LQDInput
        control={control}
        name="search"
        rules={{ required: true }}
        inputProps={{
          keyboardType: 'default',
          autoCapitalize: 'none',
          placeholder: 'Search...',
        }}
        variant="search"
      />

      <Animated.View style={[styles.resultBox, animatedStyle]}>
        {results.length > 0 ? (
          <FlatList
            data={results}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => <Text style={styles.resultText}>{item}</Text>}
          />
        ) : (
          <Text style={styles.noResultText}>No results found</Text>
        )}
      </Animated.View>
    </View>
  );
};

export default LQDSearch;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 1,
  },

  resultBox: {
    position: 'absolute',
    zIndex: 10,
    top: '100%',
    left: 0,
    marginTop: 10,
    width: '100%',
    overflow: 'hidden',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#EAEEF4',
    shadowColor: 'rgba(15, 23, 42, 0.04)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 4,
  },
  resultText: {
    padding: 10,
    fontSize: adjustFontSizeForIOS(16, 2),
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  noResultText: {
    padding: 10,
    fontSize: adjustFontSizeForIOS(16, 2),
    textAlign: 'center',
    color: '#999',
  },
});
