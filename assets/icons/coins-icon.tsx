import Svg, { Path } from 'react-native-svg';

const CoinsIcon = ({ fill = '#64748B', height = 16, width = 16 }: IconProps) => (
  <Svg width={width} height={height} fill="none">
    <Path
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12.333 8.433V10.9c0 2.08-1.94 3.767-4.333 3.767-2.393 0-4.333-1.687-4.333-3.767V8.433C3.667 10.513 5.607 12 8 12c2.393 0 4.333-1.487 4.333-3.567Z"
    />
    <Path
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12.333 5.1c0 .607-.166 1.167-.46 1.647C11.16 7.92 9.693 8.667 8 8.667s-3.16-.747-3.873-1.92a3.136 3.136 0 0 1-.46-1.647c0-1.04.486-1.98 1.266-2.66C5.72 1.753 6.8 1.333 8 1.333c1.2 0 2.28.42 3.067 1.1.78.687 1.266 1.627 1.266 2.667Z"
    />
    <Path
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12.333 5.1v3.333C12.333 10.513 10.393 12 8 12c-2.393 0-4.333-1.487-4.333-3.567V5.1c0-2.08 1.94-3.767 4.333-3.767 1.2 0 2.28.42 3.067 1.1.78.687 1.266 1.627 1.266 2.667Z"
    />
  </Svg>
);
export default CoinsIcon;
