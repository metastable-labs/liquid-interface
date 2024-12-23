import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { adjustFontSizeForIOS } from '@/utils/helpers';
import { CaretLeftIcon, CloseIcon, LampIcon } from '@/assets/icons';
import { ILQDStackHeader } from './types';

const LQDStackHeader = ({ navigation, options, hasTitle, leftIcon = 'back', rightIcon = '', style }: ILQDStackHeader) => {
  const lIcon = {
    close: <CloseIcon />,
    back: <CaretLeftIcon />,
  };
  const rIcon = {
    bulb: <LampIcon />,
  };

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity style={styles.icon} onPress={() => navigation.goBack()}>
        {leftIcon && lIcon[leftIcon]}
      </TouchableOpacity>

      {hasTitle && (
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{`${options?.headerTitle}`}</Text>
        </View>
      )}

      <TouchableOpacity style={styles.icon}>{rightIcon && rIcon[rightIcon]}</TouchableOpacity>
    </View>
  );
};

export default LQDStackHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingBottom: 10,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
  },

  titleContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    color: '#1E293B',
    fontSize: adjustFontSizeForIOS(16, 1),
    lineHeight: 19.84,
    fontWeight: '500',
    fontFamily: 'AeonikMedium',
  },
  icon: {
    zIndex: 2,
  },
});
