import Svg, { Path } from 'react-native-svg';

const DollarSquareIcon = ({ fill = '#0F172A', height = 19, width = 18 }: IconProps) => (
  <Svg width={width} height={height} fill="none">
    <Path
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M6.504 11.248c0 .967.742 1.747 1.665 1.747h1.882c.803 0 1.455-.682 1.455-1.522 0-.915-.397-1.238-.99-1.448l-3.022-1.05c-.593-.21-.99-.532-.99-1.447 0-.84.652-1.523 1.455-1.523H9.84c.923 0 1.665.78 1.665 1.748M9 5v9"
    />
    <Path
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M11.25 17h-4.5C3 17 1.5 15.5 1.5 11.75v-4.5C1.5 3.5 3 2 6.75 2h4.5C15 2 16.5 3.5 16.5 7.25v4.5C16.5 15.5 15 17 11.25 17Z"
    />
  </Svg>
);
export default DollarSquareIcon;
