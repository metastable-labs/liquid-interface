import Svg, { Path } from 'react-native-svg';

const SmileEmojiIcon = ({ fill = '#0C0507', height = 20, width = 20 }) => (
  <Svg width={width} height={height} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path
      d="M7.50033 18.3333H12.5003C16.667 18.3333 18.3337 16.6666 18.3337 12.5V7.49996C18.3337 3.33329 16.667 1.66663 12.5003 1.66663H7.50033C3.33366 1.66663 1.66699 3.33329 1.66699 7.49996V12.5C1.66699 16.6666 3.33366 18.3333 7.50033 18.3333Z"
      stroke={fill}
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <Path
      d="M12.917 8.125C13.6073 8.125 14.167 7.56536 14.167 6.875C14.167 6.18464 13.6073 5.625 12.917 5.625C12.2266 5.625 11.667 6.18464 11.667 6.875C11.667 7.56536 12.2266 8.125 12.917 8.125Z"
      stroke={fill}
      stroke-width="1.5"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <Path
      d="M7.08301 8.125C7.77336 8.125 8.33301 7.56536 8.33301 6.875C8.33301 6.18464 7.77336 5.625 7.08301 5.625C6.39265 5.625 5.83301 6.18464 5.83301 6.875C5.83301 7.56536 6.39265 8.125 7.08301 8.125Z"
      stroke={fill}
      stroke-width="1.5"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <Path
      d="M7 11.0834H13C13.4167 11.0834 13.75 11.4167 13.75 11.8334C13.75 13.9084 12.075 15.5834 10 15.5834C7.925 15.5834 6.25 13.9084 6.25 11.8334C6.25 11.4167 6.58333 11.0834 7 11.0834Z"
      stroke={fill}
      stroke-width="1.5"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </Svg>
);
export default SmileEmojiIcon;
