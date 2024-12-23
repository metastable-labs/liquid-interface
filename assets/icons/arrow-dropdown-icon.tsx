import Svg, { Path } from 'react-native-svg';

const ArrowDropdownDownIcon = ({ fill = '#94A3B8', height = 16, width = 16 }: IconProps) => (
  <Svg width={width} height={height} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path
      d="M13.2797 5.96655L8.93306 10.3132C8.41973 10.8266 7.57973 10.8266 7.06639 10.3132L2.71973 5.96655"
      stroke={fill}
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </Svg>
);
export default ArrowDropdownDownIcon;
