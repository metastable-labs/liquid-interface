import Svg, { Path } from 'react-native-svg';

const CaretRightAltIcon = ({ fill = '#0C0507', height = 15, width = 14 }: IconProps) => (
  <Svg width={width} height={height} fill="none">
    <Path
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d="M5.198 12.12 9 8.317c.449-.45.449-1.185 0-1.634L5.198 2.88"
    />
  </Svg>
);
export default CaretRightAltIcon;
