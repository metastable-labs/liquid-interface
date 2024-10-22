import Svg, { Path } from 'react-native-svg';

const ArrowUpIcon = ({ fill = '#334155', height = 18, width = 19 }: IconProps) => (
  <Svg width={width} height={height} fill="none">
    <Path
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.35}
      d="M14.053 7.178 9.5 2.625 4.947 7.178M9.5 15.375V2.752"
    />
  </Svg>
);
export default ArrowUpIcon;
