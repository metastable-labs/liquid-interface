import Svg, { Path } from 'react-native-svg';

const BitcoinConvertIcon = ({ fill = '#64748B', height = 21, width = 21 }: IconProps) => (
  <Svg width={width} height={height} fill="none">
    <Path
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.563}
      d="M19.667 14.08a5.83 5.83 0 0 1-5.834 5.833l.876-1.458M1.333 7.413A5.83 5.83 0 0 1 7.167 1.58l-.875 1.458"
    />
    <Path
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.563}
      d="M12.875 13.547a5.14 5.14 0 0 1-5.142 5.141 5.14 5.14 0 0 1-5.141-5.141 5.14 5.14 0 0 1 5.141-5.142c.134 0 .259.008.4.017a5.145 5.145 0 0 1 4.734 4.733c0 .125.008.25.008.392Z"
    />
    <Path
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.563}
      d="M18.417 7.996a5.14 5.14 0 0 1-5.142 5.142h-.408a5.145 5.145 0 0 0-4.733-4.733v-.409a5.14 5.14 0 0 1 5.141-5.141 5.14 5.14 0 0 1 5.142 5.141Z"
    />
  </Svg>
);
export default BitcoinConvertIcon;
