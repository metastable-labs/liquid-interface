import Svg, { Path } from 'react-native-svg';

const HomeIcon = ({ fill = '#020617', height = 24, width = 25 }: IconProps) => (
  <Svg width={width} height={height} fill="none">
    <Path fill={fill} d="M12.75 18v-3 3Z" />
    <Path
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M12.75 18v-3M10.82 2.82 3.89 8.37c-.78.62-1.28 1.93-1.11 2.91l1.33 7.96c.24 1.42 1.6 2.57 3.04 2.57h11.2c1.43 0 2.8-1.16 3.04-2.57l1.33-7.96c.16-.98-.34-2.29-1.11-2.91l-6.93-5.54c-1.07-.86-2.8-.86-3.86-.01Z"
    />
  </Svg>
);
export default HomeIcon;
