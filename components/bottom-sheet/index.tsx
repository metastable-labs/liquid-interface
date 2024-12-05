import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Pressable } from 'react-native';
import Modal from 'react-native-modal';

import { adjustFontSizeForIOS } from '@/utils/helpers';
import { CloseIcon } from '@/assets/icons';

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
    <Modal style={{ padding: 0, margin: 0 }} statusBarTranslucent isVisible={show} animationIn="slideInUp">
      <Pressable style={styles.overlay} />
      <View
        style={{
          ...styles.bottomSheet,
          maxHeight: bottomSheetMaxHeights[variant],
          height: variant === 'secondary' ? '83%' : 'auto',
        }}
      >
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <TouchableOpacity onPress={onClose} style={{ position: 'absolute', right: 0 }}>
            <CloseIcon />
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
    justifyContent: 'flex-end',
    width: '100%',
  },

  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    zIndex: 30,
    width: '100%',
    paddingBottom: 62.45,
    paddingTop: 17,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    gap: 33,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    color: '#0F172A',
    fontSize: adjustFontSizeForIOS(17, 3),
    lineHeight: 23.2,
    fontWeight: '500',
    fontFamily: 'AeonikMedium',
  },

  content: {
    flex: 1,
  },
});

export default LQDBottomSheet;
