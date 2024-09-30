import { StyleProp, ViewStyle, ImageStyle, TextStyle } from 'react-native';

interface ILQDOnboardingStep {
  firstArc: any;
  image: any;
  secondArc: any;
  subtitle: string;
  title: string;
  containerStyle?: StyleProp<ViewStyle>;
  firstArcStyle?: StyleProp<ImageStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  secondArcStyle?: StyleProp<ImageStyle>;
}

export type { ILQDOnboardingStep };
