import Svg, { Path, Rect } from 'react-native-svg';

const StatsDepositIcon = ({ height = 30, width = 30, fill = '#1E293B' }: IconProps) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Rect width="30" height="30" rx="9" fill={fill} />
      <Path
        d="M21.3762 17.2424L17.6187 21.0074"
        stroke="white"
        stroke-width="1.125"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M8.62598 17.2424H21.376"
        stroke="white"
        stroke-width="1.125"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M8.62598 12.7574L12.3835 8.99243"
        stroke="white"
        stroke-width="1.125"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M21.376 12.7571H8.62598"
        stroke="white"
        stroke-width="1.125"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default StatsDepositIcon;
