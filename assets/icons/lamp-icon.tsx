import Svg, { Path } from 'react-native-svg';

const LampIcon = ({ fill = '#1E293B', height = 24, width = 24 }: IconProps) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path
      d="M12.0001 7.88989L10.9301 9.74989C10.6901 10.1599 10.8901 10.4999 11.3601 10.4999H12.6301C13.1101 10.4999 13.3001 10.8399 13.0601 11.2499L12.0001 13.1099"
      stroke={fill}
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <Path
      d="M8.30035 18.0399V16.8799C6.00035 15.4899 4.11035 12.7799 4.11035 9.89993C4.11035 4.94993 8.66035 1.06993 13.8004 2.18993C16.0604 2.68993 18.0404 4.18993 19.0704 6.25993C21.1604 10.4599 18.9604 14.9199 15.7304 16.8699V18.0299C15.7304 18.3199 15.8404 18.9899 14.7704 18.9899H9.26035C8.16035 18.9999 8.30035 18.5699 8.30035 18.0399Z"
      stroke={fill}
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <Path d="M8.5 22C10.79 21.35 13.21 21.35 15.5 22" stroke="#1E293B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
  </Svg>
);
export default LampIcon;
