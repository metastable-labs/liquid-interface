import Svg, { Path } from 'react-native-svg';

const BitcoinConvertAltIcon = ({ fill = '#4691FE', height = 24, width = 24 }: IconProps) => (
  <Svg width={width} height={height} fill="none">
    <Path
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M23 15.97c0 3.87-3.13 7-7 7l1.05-1.75M1 7.97c0-3.87 3.13-7 7-7L6.95 2.72"
    />
    <Path
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d="M14.85 15.33c0 3.41-2.76 6.17-6.17 6.17s-6.17-2.76-6.17-6.17 2.76-6.17 6.17-6.17c.16 0 .31.01.48.02 3.03.23 5.45 2.65 5.68 5.68 0 .15.01.3.01.47Z"
    />
    <Path
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d="M21.5 8.67c0 3.41-2.76 6.17-6.17 6.17h-.49a6.174 6.174 0 0 0-5.68-5.68v-.49c0-3.41 2.76-6.17 6.17-6.17s6.17 2.76 6.17 6.17Z"
    />
  </Svg>
);
export default BitcoinConvertAltIcon;
