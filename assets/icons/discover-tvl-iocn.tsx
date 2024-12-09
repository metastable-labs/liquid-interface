import Svg, { Path } from 'react-native-svg';

const DiscoverTVLIcon = ({ fill = '#0C0507', height = 24, width = 25 }: IconProps) => (
  <Svg width={width} height={height} viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path
      d="M8.00098 11.8001C8.00098 12.5701 8.60098 13.2001 9.33098 13.2001H10.831C11.471 13.2001 11.991 12.6501 11.991 11.9801C11.991 11.2501 11.671 10.9901 11.201 10.8201L8.80098 9.9801C8.32098 9.8101 8.00098 9.5501 8.00098 8.8201C8.00098 8.1501 8.52098 7.6001 9.16098 7.6001H10.661C11.401 7.6101 12.001 8.2301 12.001 9.0001"
      stroke={fill}
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <Path d="M10.001 13.25V13.99" stroke={fill} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <Path d="M10.001 6.81006V7.59006" stroke={fill} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <Path
      d="M9.99098 18.3799C14.4037 18.3799 17.981 14.8027 17.981 10.3899C17.981 5.97715 14.4037 2.3999 9.99098 2.3999C5.57822 2.3999 2.00098 5.97715 2.00098 10.3899C2.00098 14.8027 5.57822 18.3799 9.99098 18.3799Z"
      stroke={fill}
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <Path
      d="M12.9814 20.2799C13.8814 21.5499 15.3514 22.3799 17.0314 22.3799C19.7614 22.3799 21.9814 20.1599 21.9814 17.4299C21.9814 15.7699 21.1614 14.2999 19.9114 13.3999"
      stroke={fill}
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </Svg>
);
export default DiscoverTVLIcon;
