import Svg, { Path } from 'react-native-svg';

const SwapHorizontalIcon = ({ fill = '#64748B', height = 20, width = 20 }: IconProps) => (
  <Svg width={width} height={height} fill="none">
    <Path
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.563}
      d="m17.083 12.492-4.175 4.183M2.917 12.492h14.166M2.917 7.508l4.175-4.183M17.083 7.508H2.917"
    />
  </Svg>
);
export default SwapHorizontalIcon;
