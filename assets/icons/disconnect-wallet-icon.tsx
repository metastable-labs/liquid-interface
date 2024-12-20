import Svg, { Path, Rect } from 'react-native-svg';

const DisconnectWalletIcon = ({ fill = '#AF1D38', height = 30, width = 30 }: IconProps) => (
  <Svg width={width} height={height} viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Rect width="30" height="30" rx="9" fill={fill} />
    <Path
      d="M19.53 16.1635C19.215 16.471 19.035 16.9135 19.08 17.386C19.1475 18.196 19.89 18.7885 20.7 18.7885H22.125V19.681C22.125 21.2335 20.8575 22.501 19.305 22.501H11.7225C11.955 22.306 12.1575 22.066 12.315 21.796C12.5925 21.346 12.75 20.8135 12.75 20.251C12.75 18.5935 11.4075 17.251 9.75 17.251C9.045 17.251 8.3925 17.4985 7.875 17.911V14.6335C7.875 13.081 9.1425 11.8135 10.695 11.8135H19.305C20.8575 11.8135 22.125 13.081 22.125 14.6335V15.7135H20.61C20.19 15.7135 19.8075 15.8785 19.53 16.1635Z"
      stroke="white"
      stroke-width="1.125"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <Path
      d="M7.875 15.3085V11.881C7.875 10.9885 8.4225 10.1935 9.255 9.87846L15.21 7.62846C16.14 7.27596 17.1375 7.96598 17.1375 8.96348V11.8135"
      stroke="white"
      stroke-width="1.125"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <Path
      d="M22.9191 16.4779V18.0229C22.9191 18.4354 22.5891 18.7729 22.1691 18.7879H20.6991C19.8891 18.7879 19.1466 18.1954 19.0791 17.3854C19.0341 16.9129 19.2141 16.4704 19.5291 16.1629C19.8066 15.8779 20.1891 15.7129 20.6091 15.7129H22.1691C22.5891 15.7279 22.9191 16.0654 22.9191 16.4779Z"
      stroke="white"
      stroke-width="1.125"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <Path d="M11.25 15H16.5" stroke="white" stroke-width="1.125" stroke-linecap="round" stroke-linejoin="round" />
    <Path
      d="M12.75 20.25C12.75 20.8125 12.5925 21.345 12.315 21.795C12.1575 22.065 11.955 22.305 11.7225 22.5C11.1975 22.9725 10.5075 23.25 9.75 23.25C8.655 23.25 7.7025 22.665 7.185 21.795C6.9075 21.345 6.75 20.8125 6.75 20.25C6.75 19.305 7.185 18.4575 7.875 17.91C8.3925 17.4975 9.045 17.25 9.75 17.25C11.4075 17.25 12.75 18.5925 12.75 20.25Z"
      stroke="white"
      stroke-width="1.125"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <Path
      d="M10.5519 21.0298L8.96191 19.4473"
      stroke="white"
      stroke-width="1.125"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <Path
      d="M10.5373 19.4697L8.94727 21.0522"
      stroke="white"
      stroke-width="1.125"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </Svg>
);
export default DisconnectWalletIcon;
