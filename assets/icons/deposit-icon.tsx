import Svg, { Path } from 'react-native-svg';

const DepositIcon = ({ fill = '#fff', height = 14, width = 14 }: IconProps) => (
  <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path
      d="M8.00016 14.6667C11.6668 14.6667 14.6668 11.6667 14.6668 8.00004C14.6668 4.33337 11.6668 1.33337 8.00016 1.33337C4.3335 1.33337 1.3335 4.33337 1.3335 8.00004C1.3335 11.6667 4.3335 14.6667 8.00016 14.6667Z"
      stroke="#1A8860"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <Path d="M5.3335 8H10.6668" stroke="#1A8860" stroke-linecap="round" stroke-linejoin="round" />
    <Path d="M8 10.6667V5.33337" stroke="#1A8860" stroke-linecap="round" stroke-linejoin="round" />
  </Svg>
);
export default DepositIcon;
