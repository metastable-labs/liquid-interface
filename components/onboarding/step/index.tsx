import { Text, View, StyleSheet, Image } from 'react-native';
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
      <Text style={styles.title}>{title}</Text>

      <Text style={styles.subtitle}>{subtitle}</Text>

      <Image source={image} style={[styles.image, imageStyle]} resizeMode="contain" />

      <Image source={firstArc} style={[{ position: 'absolute', zIndex: -1 }, firstArcStyle]} resizeMode="contain" />

      <Image source={secondArc} style={[{ position: 'absolute', zIndex: -1 }, secondArcStyle]} resizeMode="contain" />
    </View>
  );
};

export default LQDOnboardingStep;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 136,
    gap: 22,
  },

  title: {
    fontFamily: 'QuantaGroteskProBold',
    fontSize: 48,
    fontWeight: '700',
    lineHeight: 53,
    letterSpacing: -0.96,
    paddingHorizontal: 16,
    color: '#FFF',
  },

  subtitle: {
    fontSize: 18,
    lineHeight: 22.32,
    paddingHorizontal: 16,
    fontFamily: 'AeonikRegular',
    color: '#FFF',
  },

  image: {
    position: 'absolute',
    bottom: 136,
  },
});
