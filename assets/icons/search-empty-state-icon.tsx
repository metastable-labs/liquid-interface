import Svg, { Path, Rect } from 'react-native-svg';

const SearchEmptyStateIcon = ({ fill = '#fff', height = 14, width = 14 }: IconProps) => (
  <Svg width="41" height="40" viewBox="0 0 41 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Rect x="0.5" width="40" height="40" rx="12" fill="#334155" />
    <Path d="M17.5 19.7H22.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <Path
      d="M20 29C25.2467 29 29.5 24.7467 29.5 19.5C29.5 14.2533 25.2467 10 20 10C14.7533 10 10.5 14.2533 10.5 19.5C10.5 24.7467 14.7533 29 20 29Z"
      stroke="white"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <Path d="M30.5 30L28.5 28" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
  </Svg>
);
export default SearchEmptyStateIcon;
