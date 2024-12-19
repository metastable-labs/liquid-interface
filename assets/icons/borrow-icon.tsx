import Svg, { Path } from 'react-native-svg';

const BorrowIcon = ({ fill = '#AF1D38', height = 16, width = 16 }: IconProps) => (
  <Svg width={width} height={height} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path
      d="M6.3335 9.1667C6.3335 9.81336 6.83351 10.3334 7.44684 10.3334H8.70015C9.23349 10.3334 9.66683 9.88003 9.66683 9.31336C9.66683 8.7067 9.40017 8.4867 9.00684 8.3467L7.00016 7.6467C6.60683 7.5067 6.34017 7.29337 6.34017 6.68003C6.34017 6.12003 6.77349 5.66003 7.30682 5.66003H8.56016C9.17349 5.66003 9.6735 6.18003 9.6735 6.8267"
      stroke={fill}
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <Path d="M8 5V11" stroke={fill} stroke-linecap="round" stroke-linejoin="round" />
    <Path
      d="M14.6668 8.00004C14.6668 11.68 11.6802 14.6667 8.00016 14.6667C4.32016 14.6667 1.3335 11.68 1.3335 8.00004C1.3335 4.32004 4.32016 1.33337 8.00016 1.33337"
      stroke={fill}
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <Path d="M11.3335 2V4.66667H14.0002" stroke={fill} stroke-linecap="round" stroke-linejoin="round" />
    <Path d="M14.6668 1.33337L11.3335 4.66671" stroke={fill} stroke-linecap="round" stroke-linejoin="round" />
  </Svg>
);
export default BorrowIcon;
