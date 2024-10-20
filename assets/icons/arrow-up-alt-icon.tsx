import Svg, { Path } from 'react-native-svg';

const ArrowUpAltIcon = ({ fill = '#156146', height = 12, width = 12 }: IconProps) => (
  <Svg width={width} height={height} fill="none">
    <Path fill="#EFFAF6" d="M9.035 4.785 6 1.75 2.965 4.785" />
    <Path
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.286}
      d="M9.035 4.785 6 1.75 2.965 4.785M6 10.25V1.835"
    />
  </Svg>
);
export default ArrowUpAltIcon;
