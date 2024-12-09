import Svg, { Path } from 'react-native-svg';

const ShareIcon = ({ fill = '#fff', height = 19, width = 18 }: IconProps) => (
  <Svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path
      d="M3.3335 10.5V17.1667C3.3335 17.6087 3.50909 18.0326 3.82165 18.3452C4.13421 18.6577 4.55814 18.8333 5.00016 18.8333H15.0002C15.4422 18.8333 15.8661 18.6577 16.1787 18.3452C16.4912 18.0326 16.6668 17.6087 16.6668 17.1667V10.5"
      stroke="#243542"
      stroke-width="1.25"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <Path
      d="M13.3332 5.49996L9.99984 2.16663L6.6665 5.49996"
      stroke="#243542"
      stroke-width="1.25"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <Path d="M10 2.16663V13" stroke="#243542" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
  </Svg>
);
export default ShareIcon;
