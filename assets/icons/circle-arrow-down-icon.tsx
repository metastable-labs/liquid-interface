import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const CircleArrowDownIcon = ({ fill = '#fff', height = 25, width = 24 }: IconProps) => (
  <Svg width={width} height={height} fill="none">
    <Path
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M12 22.5c5.523 0 10-4.477 10-10s-4.477-10-10-10-10 4.477-10 10 4.477 10 10 10ZM12 9v6"
    />
    <Path stroke={fill} strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m9 13 3 3 3-3" />
  </Svg>
);
export default CircleArrowDownIcon;
