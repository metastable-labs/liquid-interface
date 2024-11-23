import { StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useState } from 'react';

const defaultAIconUrl = 'https://res.cloudinary.com/djzeufu4j/image/upload/v1732105634/tokenAIcon_jgy241.png';
const defaultBIconUrl = 'https://res.cloudinary.com/djzeufu4j/image/upload/v1732105634/tokenBIcon_wscb3p.png';

const LQDPoolImages = ({ tokenAIconURL, tokenBIconURL }: PoolImages) => {
  const [tokenAIconError, setTokenAIconError] = useState(false);
  const [tokenBIconError, setTokenBIconError] = useState(false);

  const iconA = tokenAIconError ? defaultAIconUrl : tokenAIconURL || defaultAIconUrl;

  const iconB = tokenBIconError ? defaultBIconUrl : tokenBIconURL || defaultBIconUrl;

  return (
    <View style={styles.iconContainer}>
      {[iconA, iconB].map((iconURL, index) => (
        <View key={index} style={[styles.icon, index === 0 && { position: 'relative', zIndex: 1 }]}>
          <FastImage
            style={styles.image}
            source={{
              uri: iconURL,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.contain}
            onError={() => (index === 0 ? setTokenAIconError(true) : setTokenBIconError(true))}
          />
        </View>
      ))}
    </View>
  );
};

export default LQDPoolImages;

const styles = StyleSheet.create({
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  icon: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: '#EAEEF4',
    marginRight: -6,
  },

  image: {
    width: 24,
    height: 24,
    borderRadius: 9999,
  },
});
