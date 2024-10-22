import Svg, { Path } from 'react-native-svg';

const CaretLeftIcon = ({ fill = '#0F172A', height = 20, width = 20 }: IconProps) => (
  <Svg width={width} height={height} fill="none">
    <Path
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.25}
      d="m12.5 16.6-5.433-5.433a1.655 1.655 0 0 1 0-2.334L12.5 3.4"
    />
  </Svg>
);
export default CaretLeftIcon;
