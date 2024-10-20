import Svg, { Path } from 'react-native-svg';

const CardAltIcon = ({ fill = '#fff', height = 18, width = 18 }: IconProps) => (
  <Svg width={width} height={height} fill="none">
    <Path
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.125}
      d="M1.5 6.379h15M4.5 12.379H6M7.875 12.379h3"
    />
    <Path
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.125}
      d="M4.83 2.629h8.332c2.67 0 3.338.66 3.338 3.292v6.158c0 2.632-.668 3.292-3.33 3.292H4.83c-2.663.008-3.33-.652-3.33-3.285V5.921c0-2.632.667-3.292 3.33-3.292Z"
    />
  </Svg>
);
export default CardAltIcon;
