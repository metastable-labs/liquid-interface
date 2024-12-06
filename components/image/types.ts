import { FastImageProps } from 'react-native-fast-image';

export interface LQDImageProps extends Omit<FastImageProps, 'onError'> {
  fallbackImage?: string;
  src?: string;
  height?: number;
  width?: number;
  edit?: boolean;
  onError?: () => void;
}
