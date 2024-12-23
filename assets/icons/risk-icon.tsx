import Svg, { Path, Rect } from 'react-native-svg';

const RiskIcon = ({ height = 30, width = 30, fill = '#1E293B' }: IconProps) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Rect x="0.5" width="30" height="30" rx="9" fill={fill} />
      <Path
        d="M13.251 22.4996H17.751C21.501 22.4996 23.001 20.9996 23.001 17.2496V12.7496C23.001 8.99963 21.501 7.49963 17.751 7.49963H13.251C9.50098 7.49963 8.00098 8.99963 8.00098 12.7496V17.2496C8.00098 20.9996 9.50098 22.4996 13.251 22.4996Z"
        stroke="white"
        stroke-width="1.125"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M18.126 19.8746C18.951 19.8746 19.626 19.1996 19.626 18.3746V11.6246C19.626 10.7996 18.951 10.1246 18.126 10.1246C17.301 10.1246 16.626 10.7996 16.626 11.6246V18.3746C16.626 19.1996 17.2935 19.8746 18.126 19.8746Z"
        stroke="white"
        stroke-width="1.125"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M12.876 19.8746C13.701 19.8746 14.376 19.1996 14.376 18.3746V15.7496C14.376 14.9246 13.701 14.2496 12.876 14.2496C12.051 14.2496 11.376 14.9246 11.376 15.7496V18.3746C11.376 19.1996 12.0435 19.8746 12.876 19.8746Z"
        stroke="white"
        stroke-width="1.125"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default RiskIcon;
