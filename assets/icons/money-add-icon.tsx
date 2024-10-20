import Svg, { Path } from 'react-native-svg';

const MoneyAddIcon = ({ fill = '#4691FE', height = 24, width = 24 }: IconProps) => (
  <Svg width={width} height={height} fill="none">
    <Path
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d="M12 14.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM18.5 9.5v5M9 18c0 .75-.21 1.46-.58 2.06A3.97 3.97 0 0 1 5 22a3.97 3.97 0 0 1-3.42-1.94A3.92 3.92 0 0 1 1 18c0-2.21 1.79-4 4-4s4 1.79 4 4ZM6.492 17.98h-2.98M5 16.52v2.99"
    />
    <Path
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d="M2 15.3V9c0-3.5 2-5 5-5h10c3 0 5 1.5 5 5v6c0 3.5-2 5-5 5H8.5"
    />
  </Svg>
);
export default MoneyAddIcon;
