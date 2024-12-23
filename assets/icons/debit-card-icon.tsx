import Svg, { G, Path, Rect } from 'react-native-svg';

const DebitCardIcon = ({ height = 30, width = 30, fill = '#0F172A' }: IconProps) => (
  <Svg width={width} height={height} viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Rect width="30" height="30" rx="9" fill={fill} />
    <Path d="M7.5 12.3789H22.5" stroke="white" stroke-width="1.125" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
    <Path d="M10.5 18.3789H12" stroke="white" stroke-width="1.125" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
    <Path
      d="M13.875 18.3789H16.875"
      stroke="white"
      stroke-width="1.125"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <Path
      d="M10.83 8.62891H19.1625C21.8325 8.62891 22.5 9.28891 22.5 11.9214V18.0789C22.5 20.7114 21.8325 21.3714 19.17 21.3714H10.83C8.1675 21.3789 7.5 20.7189 7.5 18.0864V11.9214C7.5 9.28891 8.1675 8.62891 10.83 8.62891Z"
      stroke="white"
      stroke-width="1.125"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </Svg>
);
export default DebitCardIcon;
