import { StyleProp, ViewStyle } from 'react-native';

export interface Slider {
  title?: string;
  subTitle?: string;
  image?: string;
  variant?: 'strategy' | 'deposit';
}

export interface ISlider {
  items: Slider[];
}
