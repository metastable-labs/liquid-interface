import Svg, { Path, Defs, Pattern, Use, Image } from 'react-native-svg';

const MoonWellIcon = ({ fill = '', height = 18, width = 24 }: IconProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width={width} height={height} fill="none">
    <Path fill="url(#a)" d="M0 .428h24v17.143H0z" />
    <Defs>
      <Pattern id="a" width={1} height={1} patternContentUnits="objectBoundingBox">
        <Use xlinkHref="#b" transform="scale(.01587 .02222)" />
      </Pattern>
      <Image
        xlinkHref="data:image/png;base64,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"
        id="b"
        width={300}
        height={45}
      />
    </Defs>
  </Svg>
);
export default MoonWellIcon;