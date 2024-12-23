import Svg, { Path } from 'react-native-svg';

const HeaderMenuIcon = ({ fill = '#020617', height = 24, width = 25 }: IconProps) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path d="M3 7H21" stroke="#0F172A" stroke-width="1.5" stroke-linecap="round" />
    <Path d="M6 12H18" stroke="#0F172A" stroke-width="1.5" stroke-linecap="round" />
    <Path d="M10 17H14" stroke="#0F172A" stroke-width="1.5" stroke-linecap="round" />
  </Svg>
);
export default HeaderMenuIcon;
