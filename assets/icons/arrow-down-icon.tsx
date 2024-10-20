import Svg, { Path } from 'react-native-svg';

const ArrowDownIcon = ({ fill = '#FF8896', height = 12, width = 12 }: IconProps) => (
  <Svg width={width} height={height} fill="none">
    <Path
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={0.75}
      d="M9.035 7.215 6 10.25 2.965 7.215M6 1.75v8.415"
    />
  </Svg>
);
export default ArrowDownIcon;
