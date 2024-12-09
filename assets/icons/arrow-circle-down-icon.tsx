import Svg, { Path } from 'react-native-svg';

const ArrowCircleDownIcon = ({ fill = '#475569', height = 12, width = 12 }: IconProps) => (
  <Svg width={width} height={height} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path
      d="M6.03647 10.3996C8.44643 10.3996 10.4001 8.44595 10.4001 6.03598C10.4001 3.62602 8.44643 1.67236 6.03647 1.67236C3.62651 1.67236 1.67285 3.62602 1.67285 6.03598C1.67285 8.44595 3.62651 10.3996 6.03647 10.3996Z"
      fill="white"
      stroke={fill}
      stroke-width="0.654543"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <Path
      d="M4.49609 5.48633L6.03645 7.02232L7.57681 5.48633"
      stroke={fill}
      stroke-width="0.654543"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </Svg>
);
export default ArrowCircleDownIcon;
