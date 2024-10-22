import Svg, { Path } from 'react-native-svg';

const DollarCoinIcon = ({ fill = '#334155', height = 18, width = 19 }: IconProps) => (
  <Svg width={width} height={height} fill="none">
    <Path
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.35}
      d="M6.5 8.55c0 .577.45 1.05.997 1.05h1.126c.48 0 .87-.413.87-.915 0-.548-.24-.743-.593-.87l-1.8-.63c-.36-.128-.6-.323-.6-.87 0-.503.39-.915.87-.915h1.125c.555.007 1.005.472 1.005 1.05M8 9.637v.556M8 4.807v.585"
    />
    <Path
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.35}
      d="M7.992 13.485a5.992 5.992 0 1 0 0-11.985 5.992 5.992 0 0 0 0 11.985ZM10.235 14.91a3.708 3.708 0 0 0 3.038 1.575 3.716 3.716 0 0 0 3.712-3.712 3.721 3.721 0 0 0-1.553-3.023"
    />
  </Svg>
);
export default DollarCoinIcon;
