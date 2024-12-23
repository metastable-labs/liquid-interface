import Svg, { Path, Rect } from 'react-native-svg';

const CuratorIcon = ({ fill = '#FFF', height = 30, width = 30 }: IconProps) => (
  <Svg width={width} height={height} viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Rect width="30" height="30" rx="9" fill="#0F172A" />
    <Path
      d="M19.875 15.4874V18.2624C19.875 20.6024 17.6925 22.4999 15 22.4999C12.3075 22.4999 10.125 20.6024 10.125 18.2624V15.4874C10.125 17.8274 12.3075 19.4999 15 19.4999C17.6925 19.4999 19.875 17.8274 19.875 15.4874Z"
      stroke={fill}
      stroke-width="1.125"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <Path
      d="M19.875 11.7374C19.875 12.4199 19.6875 13.0499 19.3575 13.5899C18.555 14.9099 16.905 15.7499 15 15.7499C13.095 15.7499 11.445 14.9099 10.6425 13.5899C10.3125 13.0499 10.125 12.4199 10.125 11.7374C10.125 10.5674 10.6725 9.50988 11.55 8.74488C12.435 7.97238 13.65 7.49988 15 7.49988C16.35 7.49988 17.565 7.97238 18.45 8.73738C19.3275 9.50988 19.875 10.5674 19.875 11.7374Z"
      stroke={fill}
      stroke-width="1.125"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <Path
      d="M19.875 11.7374V15.4874C19.875 17.8274 17.6925 19.4999 15 19.4999C12.3075 19.4999 10.125 17.8274 10.125 15.4874V11.7374C10.125 9.39738 12.3075 7.49988 15 7.49988C16.35 7.49988 17.565 7.97238 18.45 8.73738C19.3275 9.50988 19.875 10.5674 19.875 11.7374Z"
      stroke={fill}
      stroke-width="1.125"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </Svg>
);

export default CuratorIcon;
