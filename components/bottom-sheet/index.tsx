import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Modal, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { adjustFontSizeForIOS } from '@/utils/helpers';

const { height } = Dimensions.get('window');

interface ILQDBottomSheet {
  title: string;
  variant?: 'primary' | 'secondary';
  show: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

const LQDBottomSheet: React.FC<ILQDBottomSheet> = ({ title, variant = 'primary', show, onClose, children }) => {
  const bottomSheetMaxHeights = {
    primary: height * 0.6,
    secondary: height * 0.83,
  };

  return (
    <Modal statusBarTranslucent transparent visible={show} animationType="slide">
      <Pressable style={styles.overlay} onPress={onClose} />

      <View
        style={{
          ...styles.bottomSheet,
          maxHeight: bottomSheetMaxHeights[variant],
          height: variant === 'secondary' ? '83%' : 'auto',
        }}
      >
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={24} color="#0C0507" />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>{children}</View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#2125506B',
    justifyContent: 'flex-end',
  },

  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    zIndex: 30,
    width: '100%',
    paddingBottom: 62.45,
    paddingTop: 27.55,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    gap: 33,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  title: {
    color: '#0F172A',
    fontSize: adjustFontSizeForIOS(20, 3),
    lineHeight: 23.2,
    fontWeight: '500',
    fontFamily: 'AeonikMedium',
  },

  content: {
    flex: 1,
  },
});

export default LQDBottomSheet;
