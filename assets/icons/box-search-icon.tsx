import Svg, { Path } from 'react-native-svg';

const BoxSearchIcon = ({ fill = '#0F172A', height = 24, width = 24 }: IconProps) => (
  <Svg width={width} height={height} fill="none">
    <Path stroke={fill} strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.17 7.44 12 12.55l8.77-5.08M12 21.61v-9.07" />
    <Path
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M21.61 12.83V9.17c0-1.38-.99-3.06-2.2-3.73l-5.34-2.96c-1.14-.64-3-.64-4.14 0L4.59 5.44c-1.21.67-2.2 2.35-2.2 3.73v5.66c0 1.38.99 3.06 2.2 3.73l5.34 2.96c.57.32 1.32.48 2.07.48.75 0 1.5-.16 2.07-.48"
    />
    <Path
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M19.2 21.4a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4ZM23 22l-1-1"
    />
  </Svg>
);
export default BoxSearchIcon;
