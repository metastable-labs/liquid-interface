import Svg, { Path } from 'react-native-svg';

const CaretDownIcon = ({ fill = '#64748B', height = 18, width = 18 }: IconProps) => (
  <Svg width={width} height={height} fill="none">
    <Path
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.577}
      d="m14.94 6.712-4.89 4.89a1.49 1.49 0 0 1-2.1 0l-4.89-4.89"
    />
  </Svg>
);
export default CaretDownIcon;
