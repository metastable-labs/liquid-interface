import Svg, { Path } from 'react-native-svg';

const MoneysIcon = ({ fill = '#fff', height = 24, width = 24 }: IconProps) => (
  <Svg width={width} height={height} fill="none">
    <Path
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d="M19.3 8.42v5.15c0 3.08-1.76 4.4-4.4 4.4H6.11c-.45 0-.88-.04-1.28-.13-.25-.04-.49-.11-.71-.19-1.5-.56-2.41-1.86-2.41-4.08V8.42c0-3.08 1.76-4.4 4.4-4.4h8.79c2.24 0 3.85.95 4.28 3.12.07.4.12.81.12 1.28Z"
    />
    <Path
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d="M22.301 11.42v5.15c0 3.08-1.76 4.4-4.4 4.4h-8.79c-.74 0-1.41-.1-1.99-.32-1.19-.44-2-1.35-2.29-2.81.4.09.83.13 1.28.13h8.79c2.64 0 4.4-1.32 4.4-4.4V8.42c0-.47-.04-.89-.12-1.28 1.9.4 3.12 1.74 3.12 4.28Z"
    />
    <Path
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d="M10.498 13.64a2.64 2.64 0 1 0 0-5.28 2.64 2.64 0 0 0 0 5.28ZM4.78 8.8v4.4M16.222 8.8v4.4"
    />
  </Svg>
);
export default MoneysIcon;
