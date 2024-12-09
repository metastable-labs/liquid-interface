import { StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native';

import { CloseIcon } from '@/assets/icons';

const queries: Array<{ value: SectionQuery; label: string }> = [
  { value: 'vol', label: 'Volume' },
  { value: 'fees', label: 'Fees' },
  { value: 'tvl', label: 'TVL' },
];

const SearchSection = ({ children, title, onClear, query, setQuery }: ISearchSection) => (
  <View style={styles.section}>
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      {query && setQuery && (
        <View style={styles.queryContainer}>
          {queries.map((item) => (
            <TouchableOpacity
              key={item.value}
              style={[styles.query, query === item.value && styles.activeQuery]}
              onPress={() => setQuery(item.value)}
              disabled={query === item.value}
            >
              <Text style={[styles.queryText, query === item.value && styles.activeQueryText]}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>

    {children}
  </View>
);

export default SearchSection;

const styles = StyleSheet.create({
  section: {
    alignSelf: 'stretch',
    gap: 20,
    marginBottom: 24,
  },

  title: {
    color: '#0F172A',
    fontSize: 16,
    lineHeight: 23.2,
    fontWeight: '500',
    fontFamily: 'AeonikMedium',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  clear: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  clearText: {
    color: '#1E293B',
    fontSize: 13,
    lineHeight: 16.12,
    fontWeight: '400',
    fontFamily: 'AeonikRegular',
  },

  queryContainer: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },

  query: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },

  queryText: {
    color: '#94A3B8',
    fontSize: 14,
    lineHeight: 18.48,
    fontWeight: '400',
    fontFamily: 'AeonikRegular',
  },

  activeQueryText: {
    color: '#1E293B',
    fontWeight: '500',
    fontFamily: 'AeonikMedium',
  },

  activeQuery: {
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    backgroundColor: '#F8FAFC',
  },
});
