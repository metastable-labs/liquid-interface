import Svg, { Path } from 'react-native-svg';

const PlusIcon = ({ fill = '#fff' }) => (
  <Svg width="30" height="30" stroke={fill} viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path d="M7.5 15H22.5" stroke="white" stroke-width="1.97138" stroke-linecap="round" stroke-linejoin="round" />
    <Path d="M15.0005 22.5V7.5" stroke="white" stroke-width="1.97138" stroke-linecap="round" stroke-linejoin="round" />
  </Svg>
);
export default PlusIcon;
