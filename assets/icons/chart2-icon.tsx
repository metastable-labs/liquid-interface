import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const Chart2Icon = ({ fill = '#fff', height = 25, width = 24 }: IconProps) => (
  <Svg width={width} height={height} fill="none">
    <Path
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M9 22.5h6c5 0 7-2 7-7v-6c0-5-2-7-7-7H9c-5 0-7 2-7 7v6c0 5 2 7 7 7Z"
    />
    <Path
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M15.5 19c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2s-2 .9-2 2v9a2 2 0 0 0 2 2ZM8.5 19c1.1 0 2-.9 2-2v-3.5c0-1.1-.9-2-2-2s-2 .9-2 2V17a2 2 0 0 0 2 2Z"
    />
  </Svg>
);
export default Chart2Icon;
