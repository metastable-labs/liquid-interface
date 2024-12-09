import Svg, { Path } from 'react-native-svg';

const ReTweetIcon = ({ fill = '#fff', height = 19, width = 18 }: IconProps) => (
  <Svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path
      d="M2.9834 4.79993H14.5168C15.9001 4.79993 17.0168 5.91659 17.0168 7.29993V10.0666"
      stroke="#0F172A"
      stroke-width="1.25"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <Path
      d="M5.61673 2.16663L2.9834 4.79994L5.61673 7.4333"
      stroke="#0F172A"
      stroke-width="1.25"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <Path
      d="M17.0168 16.2H5.4834C4.10007 16.2 2.9834 15.0834 2.9834 13.7V10.9333"
      stroke="#0C0507"
      stroke-width="1.25"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <Path
      d="M14.3833 18.8333L17.0166 16.2L14.3833 13.5667"
      stroke="#0C0507"
      stroke-width="1.25"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </Svg>
);
export default ReTweetIcon;
