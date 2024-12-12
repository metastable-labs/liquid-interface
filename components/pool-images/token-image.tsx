import { StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useState } from 'react';

const defaultIconUrl = 'https://res.cloudinary.com/djzeufu4j/image/upload/v1732105634/tokenBIcon_wscb3p.png';

const LQDTokenImage = ({ iconURL, size }: TokenImage) => {
  const [iconError, setIconError] = useState(false);

  const icon = iconError ? defaultIconUrl : iconURL || defaultIconUrl;

  return (
    <View style={styles(size).iconContainer}>
      <FastImage
        style={styles(size).icon}
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

const styles = (size: number = 24) =>
  StyleSheet.create({
    iconContainer: {
      width: size,
      height: size,
      borderWidth: 1,
      borderColor: '#EAEEF4',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 9999,
    },

    icon: {
      width: size,
      height: size,
      objectFit: 'contain',
      borderRadius: 9999,
    },
  });
