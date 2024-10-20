import Svg, { Path } from 'react-native-svg';

const MoneysAltIcon = ({ fill = '#fff', height = 19, width = 18 }: IconProps) => (
  <Svg width={width} height={height} fill="none">
    <Path
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.125}
      d="M14.476 6.44v3.862c0 2.31-1.32 3.3-3.3 3.3H4.583c-.337 0-.66-.03-.96-.097a2.916 2.916 0 0 1-.532-.143c-1.125-.42-1.808-1.395-1.808-3.06V6.44c0-2.31 1.32-3.3 3.3-3.3h6.593c1.68 0 2.887.712 3.21 2.34.052.3.09.607.09.96Z"
    />
    <Path
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.125}
      d="M16.727 8.69v3.862c0 2.31-1.32 3.3-3.3 3.3H6.834c-.555 0-1.057-.075-1.492-.24-.893-.33-1.5-1.012-1.718-2.107.3.067.623.097.96.097h6.593c1.98 0 3.3-.99 3.3-3.3V6.44c0-.353-.03-.668-.09-.96 1.425.3 2.34 1.305 2.34 3.21Z"
    />
    <Path
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.125}
      d="M7.875 10.355a1.98 1.98 0 1 0 0-3.96 1.98 1.98 0 0 0 0 3.96ZM3.586 6.725v3.3M12.167 6.725v3.3"
    />
  </Svg>
);
export default MoneysAltIcon;
