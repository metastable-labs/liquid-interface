import Svg, { G, Path, Rect, Defs, ClipPath } from 'react-native-svg';

const CoinbaseIcon = ({ height = 18, width = 19 }: IconProps) => (
  <Svg width={width} height={height} fill="none">
    <G clipPath="url(#a)">
      <Path fill="#1E293B" d="M19 1H1v18h18V1Z" />
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="M3.672 10a6.328 6.328 0 1 0 12.656 0 6.328 6.328 0 0 0-12.656 0Zm4.71-2.04a.422.422 0 0 0-.421.423v3.234c0 .233.189.422.422.422h3.234a.422.422 0 0 0 .422-.422V8.383a.422.422 0 0 0-.422-.422H8.383Z"
        clipRule="evenodd"
      />
    </G>
    <Rect width={18.3} height={18.3} x={0.85} y={0.85} stroke="#64748B" strokeWidth={0.3} rx={9.15} />
    <Defs>
      <ClipPath id="a">
        <Rect width={18} height={18} x={1} y={1} fill="#fff" rx={9} />
      </ClipPath>
    </Defs>
  </Svg>
);
export default CoinbaseIcon;
