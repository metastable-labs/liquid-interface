import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const CircleAddIcon = ({ fill = '#94A3B8', height = 25, width = 25 }: IconProps) => (
  <Svg width={width} height={height} fill="none">
    <Path
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M12.25 22.771c5.5 0 10-4.5 10-10s-4.5-10-10-10-10 4.5-10 10 4.5 10 10 10ZM8.25 12.771h8M12.25 16.771v-8"
    />
  </Svg>
);
export default CircleAddIcon;
