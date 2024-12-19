import Svg, { Path } from 'react-native-svg';

const DollarCoinSMIcon = ({ fill = '#fff', height = 16, width = 16 }: IconProps) => (
  <Svg width={width} height={height} fill="none">
    <Path
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={0.9}
      d="M5.6 7.71c0 .462.36.84.799.84h.9c.384 0 .696-.33.696-.732 0-.438-.192-.594-.474-.696l-1.44-.504c-.288-.102-.48-.258-.48-.696 0-.402.312-.732.696-.732h.9A.828.828 0 0 1 8 6.03M6.8 8.58v.444M6.8 4.716v.468"
    />
    <Path
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={0.9}
      d="M6.795 11.658a4.794 4.794 0 1 0 0-9.588 4.794 4.794 0 0 0 0 9.588ZM8.589 12.798a2.973 2.973 0 1 0 4.158-4.128"
    />
  </Svg>
);
export default DollarCoinSMIcon;
