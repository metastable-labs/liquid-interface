import Svg, { Path } from 'react-native-svg';

const CardIcon = ({ fill = '#64748B', height = 16, width = 16 }: IconProps) => (
  <Svg width={width} height={height} fill="none">
    <Path
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      d="M1.333 5.67h13.334M4 11.003h1.333M7 11.003h2.667"
    />
    <Path
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.293 2.337H11.7c2.373 0 2.967.586 2.967 2.926v5.474c0 2.34-.594 2.926-2.96 2.926H4.293c-2.366.007-2.96-.58-2.96-2.92v-5.48c0-2.34.594-2.926 2.96-2.926Z"
    />
  </Svg>
);
export default CardIcon;
