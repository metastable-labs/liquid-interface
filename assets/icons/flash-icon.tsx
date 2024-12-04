import Svg, { Path } from 'react-native-svg';

const FlashIcon = ({ fill = '#fff', height = 19, width = 18 }: IconProps) => (
  <Svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path
      d="M5.07492 11.5666H7.64992V17.5666C7.64992 18.9666 8.40826 19.25 9.33325 18.2L15.6416 11.0333C16.4166 10.1583 16.0916 9.43329 14.9166 9.43329H12.3416V3.43329C12.3416 2.03329 11.5833 1.74996 10.6583 2.79996L4.34992 9.96662C3.58326 10.85 3.90826 11.5666 5.07492 11.5666Z"
      stroke="#0F172A"
      stroke-width="1.25"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </Svg>
);
export default FlashIcon;
