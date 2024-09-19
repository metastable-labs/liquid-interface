import { StyleProp, ViewStyle, ImageStyle, TextStyle } from "react-native";

interface ILQDOnboardingStep {
  ray: any;
  image: any;
  title: string;
  subtitle: string;
  containerStyle?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  titleStyle?: StyleProp<TextStyle>;
  subtitleStyle?: StyleProp<TextStyle>;
}

export type { ILQDOnboardingStep };
