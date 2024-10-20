import Svg, { Path } from 'react-native-svg';

const CloseIcon = ({ fill = '#0C0507', height = 24, width = 24 }: IconProps) => (
  <Svg width={width} height={height} fill="none">
    <Path stroke={fill} strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.577} d="m5 5 14 14M5 19 18.999 5" />
  </Svg>
);
export default CloseIcon;
