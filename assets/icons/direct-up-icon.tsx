import Svg, { Path } from 'react-native-svg';

const DirectUpIcon = ({ fill = '#0F172A', height = 19, width = 18 }: IconProps) => (
  <Svg width={width} height={height} fill="none">
    <Path
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m6.877 4.033-4.575 8.692c-1.087 2.063 1.11 4.305 3.195 3.263l2.43-1.215a2.399 2.399 0 0 1 2.146 0l2.43 1.215c2.085 1.042 4.274-1.2 3.194-3.263l-4.574-8.692c-.9-1.71-3.346-1.71-4.246 0Z"
    />
  </Svg>
);
export default DirectUpIcon;
