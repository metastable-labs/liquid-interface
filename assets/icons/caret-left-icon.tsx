import Svg, { Path } from 'react-native-svg';

const CaretLeftIcon = ({ fill = '#1E293B', height = 24, width = 24 }: IconProps) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path
      d="M15.0008 19.9201L8.48082 13.4001C7.71082 12.6301 7.71082 11.3701 8.48082 10.6001L15.0008 4.08008"
      stroke={fill}
      stroke-width="1.5771"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </Svg>
);
export default CaretLeftIcon;
