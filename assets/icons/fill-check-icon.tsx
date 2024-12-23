import Svg, { Path, Rect } from 'react-native-svg';

const FillCheckIcon = ({ fill = '#4691FE', height = 19, width = 18 }: IconProps) => (
  <Svg width={width} height={height} viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Rect x="1" y="0.5" width="15" height="15" rx="7.5" fill={fill} />
    <Rect x="1" y="0.5" width="15" height="15" rx="7.5" stroke={fill} />
    <Path d="M11.8337 5.5L7.25033 10.0833L5.16699 8" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
  </Svg>
);
export default FillCheckIcon;
