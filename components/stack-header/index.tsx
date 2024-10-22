import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { adjustFontSizeForIOS } from '@/utils/helpers';
import { CaretLeftIcon } from '@/assets/icons';
import { ILQDStackHeader } from './types';

const LQDStackHeader = ({ navigation, options, hasTitle, style }: ILQDStackHeader) => {
  return (
    <View style={[styles.container, hasTitle && styles.hasTitleContainer, style]}>
      <TouchableOpacity style={[styles.back, hasTitle && styles.hasTitleBack]} onPress={navigation.goBack}>
        <CaretLeftIcon />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      {hasTitle && <Text style={styles.title}>{`${options?.headerTitle!}`}</Text>}
    </View>
  );
};
export default LQDStackHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    paddingBottom: 4,
    paddingHorizontal: 16,
  },

  hasTitleContainer: { justifyContent: 'center', alignItems: 'center' },

  back: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },

  hasTitleBack: {
    position: 'absolute',
    left: 16,
    bottom: 4,
  },

  backText: {
    color: '#1E293B',
    fontSize: adjustFontSizeForIOS(14, 2),
    lineHeight: 17.64,
    fontWeight: '500',
    fontFamily: 'AeonikMedium',
  },

  title: {
    color: '#181E00',
    fontSize: adjustFontSizeForIOS(20, 3),
    lineHeight: 23.2,
    fontWeight: '500',
    fontFamily: 'AeonikMedium',
  },
});
