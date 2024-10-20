import Svg, { Path } from 'react-native-svg';

const AddIcon = ({ fill = '#fff', height = 14, width = 14 }: IconProps) => (
  <Svg width={width} height={height} fill="none">
    <Path stroke={fill} strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.05} d="M3.5 7h7M7 10.5v-7" />
  </Svg>
);
export default AddIcon;
