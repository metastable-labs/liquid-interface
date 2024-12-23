import Svg, { Path } from 'react-native-svg';

const FavoriteChartIcon = ({ fill = '#fff', height = 16, width = 16 }: IconProps) => (
  <Svg width={width} height={height} fill="none">
    <Path
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={0.9}
      d="M14 8.67v-2.4c0-3-1.2-4.2-4.2-4.2H6.2c-3 0-4.2 1.2-4.2 4.2v3.6c0 3 1.2 4.2 4.2 4.2h2.4"
    />
    <Path
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={0.9}
      d="M5.199 9.564 6.627 7.71a.602.602 0 0 1 .846-.108l1.098.864a.607.607 0 0 0 .846-.102l1.386-1.788M12.489 10.362l.168.342a.75.75 0 0 0 .48.36l.228.036c.684.114.846.618.354 1.116l-.21.21a.76.76 0 0 0-.174.612l.03.126c.186.828-.252 1.146-.972.714l-.156-.09a.737.737 0 0 0-.672 0l-.156.09c-.726.438-1.164.114-.972-.714l.03-.126a.76.76 0 0 0-.174-.612l-.21-.21c-.492-.498-.33-1.002.354-1.116l.228-.036a.746.746 0 0 0 .48-.36l.168-.342c.324-.654.852-.654 1.176 0Z"
    />
  </Svg>
);
export default FavoriteChartIcon;
