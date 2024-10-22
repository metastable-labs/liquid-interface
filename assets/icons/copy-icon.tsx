import Svg, { Path } from 'react-native-svg';

const CopyIcon = ({ fill = '#fff', height = 18, width = 19 }: IconProps) => (
  <Svg width={width} height={height} fill="none">
    <Path
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.125}
      d="M12.5 9.675v3.15c0 2.625-1.05 3.675-3.675 3.675h-3.15C3.05 16.5 2 15.45 2 12.825v-3.15C2 7.05 3.05 6 5.675 6h3.15C11.45 6 12.5 7.05 12.5 9.675Z"
    />
    <Path
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.125}
      d="M17 5.175v3.15C17 10.95 15.95 12 13.325 12H12.5V9.675C12.5 7.05 11.45 6 8.825 6H6.5v-.825C6.5 2.55 7.55 1.5 10.175 1.5h3.15C15.95 1.5 17 2.55 17 5.175Z"
    />
  </Svg>
);
export default CopyIcon;
