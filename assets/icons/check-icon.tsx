import Svg, { Path } from 'react-native-svg';

const CheckIcon = ({ fill = '#fff', height = 10, width = 10 }: IconProps) => (
  <Svg width={width} height={height} fill="none">
    <Path stroke={fill} strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.667} d="M8.333 2.5 3.75 7.083 1.667 5" />
  </Svg>
);
export default CheckIcon;
