import Svg, { Path, Rect } from 'react-native-svg';

const LockedIcon = ({ height = 30, width = 30, fill = '#1E293B' }: IconProps) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Rect width="30" height="30" rx="9" fill={fill} />
      <Path
        d="M15.001 16.8746C16.0365 16.8746 16.876 16.0352 16.876 14.9996C16.876 13.9641 16.0365 13.1246 15.001 13.1246C13.9654 13.1246 13.126 13.9641 13.126 14.9996C13.126 16.0352 13.9654 16.8746 15.001 16.8746Z"
        stroke="white"
        stroke-width="1.125"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M19.876 13.1246V16.8746"
        stroke="white"
        stroke-width="1.125"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M12.751 19.4996C12.751 20.0621 12.5935 20.5946 12.316 21.0446C11.7985 21.9146 10.846 22.4996 9.75098 22.4996C8.65598 22.4996 7.70347 21.9146 7.18597 21.0446C6.90847 20.5946 6.75098 20.0621 6.75098 19.4996C6.75098 17.8421 8.09348 16.4996 9.75098 16.4996C11.4085 16.4996 12.751 17.8421 12.751 19.4996Z"
        stroke="white"
        stroke-width="1.125"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M8.58203 19.4993L9.32452 20.2418L10.922 18.7643"
        stroke="white"
        stroke-width="1.125"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M7.50098 17.4746V12.7496C7.50098 10.1246 9.00098 8.99963 11.251 8.99963H18.751C21.001 8.99963 22.501 10.1246 22.501 12.7496V17.2496C22.501 19.8746 21.001 20.9996 18.751 20.9996H12.376"
        stroke="white"
        stroke-width="1.125"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default LockedIcon;
