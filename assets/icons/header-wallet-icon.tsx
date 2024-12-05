import Svg, { Path } from 'react-native-svg';

const HeaderWalletIcon = ({ fill = '#020617', height = 24, width = 25 }: IconProps) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path d="M13 11.15H7" stroke="#0F172A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <Path
      d="M2 11.1501V6.53009C2 4.49009 3.65 2.84009 5.69 2.84009H11.31C13.35 2.84009 15 4.11009 15 6.15009"
      stroke="#0F172A"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <Path
      d="M17.48 12.2C16.98 12.68 16.74 13.42 16.94 14.18C17.19 15.11 18.11 15.7 19.07 15.7H20V17.15C20 19.36 18.21 21.15 16 21.15H6C3.79 21.15 2 19.36 2 17.15V10.15C2 7.94002 3.79 6.15002 6 6.15002H16C18.2 6.15002 20 7.95002 20 10.15V11.6H18.92C18.36 11.6 17.85 11.82 17.48 12.2Z"
      stroke="#0F172A"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <Path
      d="M22.0002 12.62V14.68C22.0002 15.24 21.5402 15.7 20.9702 15.7H19.0402C17.9602 15.7 16.9702 14.91 16.8802 13.83C16.8202 13.2 17.0602 12.61 17.4802 12.2C17.8502 11.82 18.3602 11.6 18.9202 11.6H20.9702C21.5402 11.6 22.0002 12.06 22.0002 12.62Z"
      stroke="#0F172A"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </Svg>
);
export default HeaderWalletIcon;
