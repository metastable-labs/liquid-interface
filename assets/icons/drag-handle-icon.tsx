import Svg, { Path, Rect, Circle } from 'react-native-svg';

const DragHandleIcon = ({ fill = '#94A3B8', height = 24, width = 12 }: IconProps) => (
  <Svg width={width} height={height} viewBox="0 0 12 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Rect x="0.165094" y="1.06133" width="11.6321" height="21.8774" rx="2.47642" fill="white" />
    <Rect x="0.165094" y="1.06133" width="11.6321" height="21.8774" rx="2.47642" stroke="#F8FAFC" stroke-width="0.330189" />
    <Circle cx="3.48145" cy="6.3584" r="1.5" fill={fill} />
    <Circle cx="8.48145" cy="6.3584" r="1.5" fill={fill} />
    <Circle cx="3.48145" cy="12" r="1.5" fill={fill} />
    <Circle cx="8.48145" cy="12" r="1.5" fill={fill} />
    <Circle cx="3.48145" cy="17.6416" r="1.5" fill={fill} />
    <Circle cx="8.48145" cy="17.6416" r="1.5" fill={fill} />
  </Svg>
);
export default DragHandleIcon;
