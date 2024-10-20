import Svg, { Path } from 'react-native-svg';

const TrendUpIcon = ({ fill = '#0F172A', height = 19, width = 18 }: IconProps) => (
  <Svg width={width} height={height} fill="none">
    <Path stroke={fill} strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m12.375 7.625-3.15 3.15-1.2-1.8-2.4 2.4" />
    <Path stroke={fill} strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.875 7.625h1.5v1.5" />
    <Path
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M6.75 17h4.5c3.75 0 5.25-1.5 5.25-5.25v-4.5C16.5 3.5 15 2 11.25 2h-4.5C3 2 1.5 3.5 1.5 7.25v4.5C1.5 15.5 3 17 6.75 17Z"
    />
  </Svg>
);
export default TrendUpIcon;
