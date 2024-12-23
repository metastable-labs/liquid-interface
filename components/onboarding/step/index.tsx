import { Text, View, StyleSheet, Image } from 'react-native';

import { adjustFontSizeForIOS } from '@/utils/helpers';
import { ILQDOnboardingStep } from './types';

const LQDOnboardingStep = ({
  firstArc,
  image,
  secondArc,
  subtitle,
  title,
  containerStyle,
  firstArcStyle,
  imageStyle,
  secondArcStyle,
}: ILQDOnboardingStep) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {/* <Text style={styles.subtitle}>{subtitle}</Text> */}

      <Image source={image} style={[styles.image, imageStyle]} resizeMode="contain" />

      <Image source={firstArc} style={[{ position: 'absolute', zIndex: -1 }, firstArcStyle]} resizeMode="contain" />

      <Image source={secondArc} style={[{ position: 'absolute', zIndex: -1 }, secondArcStyle]} resizeMode="contain" />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default LQDOnboardingStep;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 136,
    gap: 22,
    alignItems: 'center',
  },

  title: {
    fontFamily: 'QuantaGroteskProBold',
    fontSize: adjustFontSizeForIOS(40, 5),
    fontWeight: '700',
    lineHeight: 50,
    letterSpacing: -0.96,
    paddingHorizontal: 15,
    color: '#0F172A',
    position: 'absolute',
    bottom: '17%',
    textAlign: 'center',
  },

  subtitle: {
    fontSize: adjustFontSizeForIOS(18, 2),
    lineHeight: 22.32,
    paddingHorizontal: 16,
    fontFamily: 'AeonikRegular',
    color: '#FFF',
  },

  image: {
    position: 'absolute',
    top: '30%',
    height: 317,
    width: 210,
    right: 0,
    left: 0,
  },
});
