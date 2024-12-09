import React, { useState } from 'react';
import FastImage from 'react-native-fast-image';
import { Pressable, StyleSheet, View } from 'react-native';
import { LQDImageProps } from './types';
import { EditProfileIcon } from '@/assets/icons';

const fallbackImage = 'https://pics.craiyon.com/2023-08-02/7a951cac85bd4aa2b0e70dbaabb8404e.webp';

const LQDImage = ({
  style,
  resizeMode = FastImage.resizeMode.contain,
  src,
  height = 40,
  width = 40,
  edit,
  action,
  onError,
  ...rest
}: LQDImageProps) => {
  const [isError, setIsError] = useState(false);
  const borderRadius = Math.min(height, width) / 2;

  const handleError = () => {
    setIsError(true);
    if (onError) onError();
  };

  if (isError) {
    return (
      <FastImage
        style={[styles.fallbackImage, { borderRadius }]}
        source={{ uri: fallbackImage, priority: FastImage.priority.high }}
        resizeMode={resizeMode}
      />
    );
  }

  return (
    <Pressable onPress={action} style={[styles.container, { width }]}>
      <FastImage
        style={[style, { height, width, borderRadius }]}
        source={{ uri: src || fallbackImage, priority: FastImage.priority.high }}
        resizeMode={resizeMode}
        onError={handleError}
        {...rest}
      />
      {edit && (
        <View style={styles.edit}>
          <EditProfileIcon />
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  fallbackImage: {
    width: 40,
    height: 40,
  },
  edit: {
    position: 'absolute',
    zIndex: 20,
    bottom: 10,
    right: -3,
  },
});

export default LQDImage;
