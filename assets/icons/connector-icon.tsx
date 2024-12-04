import Svg, { Rect } from 'react-native-svg';

const ConnectorIcon = ({ fill = '#fff', height = 19, width = 18 }: IconProps) => (
  <Svg width="2" height="10" viewBox="0 0 2 10" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Rect x="0.75" y="0.25" width="0.5" height="9.5" rx="0.25" stroke="#94A3B8" stroke-width="0.5" stroke-dasharray="2 2" />
  </Svg>
);
export default ConnectorIcon;
