import Svg, { Path } from 'react-native-svg';

const MoneyTickIcon = ({ fill = '#64748B', height = 20, width = 20 }: IconProps) => (
  <Svg width={width} height={height} fill="none">
    <Path
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.563}
      d="M10 12.083a2.083 2.083 0 1 0 0-4.166 2.083 2.083 0 0 0 0 4.166ZM15.417 7.917v4.166M7.5 15c0 .625-.175 1.217-.483 1.717a3.308 3.308 0 0 1-2.85 1.616 3.308 3.308 0 0 1-2.85-1.616A3.267 3.267 0 0 1 .833 15 3.332 3.332 0 1 1 7.5 15Z"
    />
    <Path stroke={fill} strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.563} d="m2.868 15 .825.825 1.775-1.642" />
    <Path
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.563}
      d="M1.667 12.75V7.5c0-2.917 1.666-4.167 4.166-4.167h8.334c2.5 0 4.166 1.25 4.166 4.167v5c0 2.917-1.666 4.167-4.166 4.167H7.083"
    />
  </Svg>
);
export default MoneyTickIcon;
