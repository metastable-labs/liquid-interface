import { StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useState } from 'react';

const defaultIconUrl = 'https://res.cloudinary.com/djzeufu4j/image/upload/v1732105634/tokenBIcon_wscb3p.png';

const LQDTokenImage = ({ iconURL }: TokenImage) => {
  const [iconError, setIconError] = useState(false);

  const icon = iconError ? defaultIconUrl : iconURL || defaultIconUrl;

  return (
    <View style={styles.iconContainer}>
      <FastImage
        style={styles.icon}
        source={{
          uri: icon,
          priority: FastImage.priority.high,
        }}
        resizeMode={FastImage.resizeMode.contain}
        onError={() => setIconError(true)}
      />
    </View>
  );
};

export default LQDTokenImage;

const styles = StyleSheet.create({
  iconContainer: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: '#EAEEF4',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9999,
  },

  icon: {
    width: 24,
    height: 24,
    objectFit: 'contain',
    borderRadius: 9999,
  },
});
