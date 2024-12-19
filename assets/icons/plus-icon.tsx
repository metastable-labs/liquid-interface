import Svg, { Path } from 'react-native-svg';

const PlusIcon = ({ fill = '#fff', height = 30, width = 30 }) => (
  <Svg width={width} height={height} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path d="M4.5 9H13.5" stroke={fill} stroke-width="1.125" stroke-linecap="round" stroke-linejoin="round" />
    <Path d="M9 13.5V4.5" stroke={fill} stroke-width="1.125" stroke-linecap="round" stroke-linejoin="round" />
  </Svg>
);
export default PlusIcon;
