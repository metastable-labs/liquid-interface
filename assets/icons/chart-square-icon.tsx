import Svg, { Path } from 'react-native-svg';

const ChartSquareIcon = ({ fill = '#fff', height = 16, width = 16 }: IconProps) => (
  <Svg width={width} height={height} fill="none">
    <Path
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={0.9}
      d="M6.867 7.56h-1.59a.684.684 0 0 0-.684.685v3.072h2.274V7.56v0Z"
    />
    <Path
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={0.9}
      d="M8.458 4.83h-.912a.684.684 0 0 0-.684.684v5.796h2.274V5.514c0-.378-.3-.684-.678-.684ZM10.73 8.58H9.14v2.73h2.274V9.264a.692.692 0 0 0-.684-.684Z"
    />
    <Path
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={0.9}
      d="M6.2 14.07h3.6c3 0 4.2-1.2 4.2-4.2v-3.6c0-3-1.2-4.2-4.2-4.2H6.2c-3 0-4.2 1.2-4.2 4.2v3.6c0 3 1.2 4.2 4.2 4.2Z"
    />
  </Svg>
);
export default ChartSquareIcon;
