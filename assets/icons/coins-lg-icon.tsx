import Svg, { Path } from 'react-native-svg';

const CoinsLGIcon = ({ fill = '#64748B', height = 21, width = 21 }: IconProps) => (
  <Svg width={width} height={height} fill="none">
    <Path
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.563}
      d="M15.917 11.313v3.083c0 2.6-2.425 4.709-5.417 4.709s-5.417-2.109-5.417-4.709v-3.083c0 2.6 2.425 4.458 5.417 4.458s5.417-1.858 5.417-4.458Z"
    />
    <Path
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.563}
      d="M15.917 7.146a3.92 3.92 0 0 1-.575 2.059c-.892 1.466-2.725 2.4-4.842 2.4-2.117 0-3.95-.934-4.842-2.4a3.92 3.92 0 0 1-.575-2.059c0-1.3.609-2.475 1.584-3.325C7.65 2.963 9 2.438 10.5 2.438s2.85.525 3.833 1.375c.975.858 1.584 2.033 1.584 3.333Z"
    />
    <Path
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.563}
      d="M15.917 7.146v4.167c0 2.6-2.425 4.458-5.417 4.458s-5.417-1.858-5.417-4.458V7.146c0-2.6 2.425-4.708 5.417-4.708 1.5 0 2.85.525 3.833 1.375.975.858 1.584 2.033 1.584 3.333Z"
    />
  </Svg>
);
export default CoinsLGIcon;
