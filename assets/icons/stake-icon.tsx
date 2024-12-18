import Svg, { Path } from 'react-native-svg';

const StakeIcon = ({ fill = '#253EA7', height = 16, width = 16 }: IconProps) => (
  <Svg width={width} height={height} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path
      d="M14.6667 5.66671C14.6667 8.06004 12.7267 10 10.3333 10C10.22 10 10.1 9.99338 9.98667 9.98671C9.82001 7.87338 8.12666 6.18003 6.01333 6.01337C6.00666 5.90003 6 5.78004 6 5.66671C6 3.27337 7.94 1.33337 10.3333 1.33337C12.7267 1.33337 14.6667 3.27337 14.6667 5.66671Z"
      stroke={fill}
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <Path
      d="M10.0002 10.3333C10.0002 12.7267 8.06016 14.6667 5.66683 14.6667C3.2735 14.6667 1.3335 12.7267 1.3335 10.3333C1.3335 7.94 3.2735 6 5.66683 6C5.78016 6 5.90016 6.00666 6.01349 6.01333C8.12682 6.17999 9.82017 7.87334 9.98684 9.98667C9.9935 10.1 10.0002 10.22 10.0002 10.3333Z"
      stroke={fill}
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <Path
      d="M5.08 9.74662L5.66667 8.66663L6.25334 9.74662L7.33333 10.3333L6.25334 10.92L5.66667 12L5.08 10.92L4 10.3333L5.08 9.74662Z"
      stroke={fill}
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </Svg>
);
export default StakeIcon;
