import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const Chart2AltIcon = ({ fill = '#64748B', height = 20, width = 20 }: IconProps) => (
  <Svg width={width} height={height} fill="none">
    <Path
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.563}
      d="M7.5 18.333h5c4.167 0 5.833-1.666 5.833-5.833v-5c0-4.167-1.666-5.833-5.833-5.833h-5c-4.167 0-5.833 1.666-5.833 5.833v5c0 4.167 1.666 5.833 5.833 5.833Z"
    />
    <Path
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.563}
      d="M12.917 15.417c.916 0 1.666-.75 1.666-1.667v-7.5c0-.917-.75-1.667-1.666-1.667-.917 0-1.667.75-1.667 1.667v7.5c0 .917.742 1.667 1.667 1.667ZM7.083 15.417c.917 0 1.667-.75 1.667-1.667v-2.917c0-.916-.75-1.666-1.667-1.666-.916 0-1.666.75-1.666 1.666v2.917c0 .917.741 1.667 1.666 1.667Z"
    />
  </Svg>
);
export default Chart2AltIcon;
