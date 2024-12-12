import Svg, { G, Path, Rect, Defs, ClipPath } from 'react-native-svg';

const CoinbaseWalletIcon = ({ height = 18, width = 19, fill = '#0F172A' }: IconProps) => (
  <Svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Rect width="30" height="30" rx="9" fill="#0F172A" />
    <G clip-path="url(#clip0_4256_162797)">
      <Path d="M24 6H6V24H24V6Z" fill="#1E293B" />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M8.67188 15C8.67188 18.4949 11.5051 21.3281 15 21.3281C18.4949 21.3281 21.3281 18.4949 21.3281 15C21.3281 11.5051 18.4949 8.67188 15 8.67188C11.5051 8.67188 8.67188 11.5051 8.67188 15ZM13.3828 12.9609C13.1498 12.9609 12.9609 13.1498 12.9609 13.3828V16.6172C12.9609 16.8502 13.1498 17.0391 13.3828 17.0391H16.6172C16.8502 17.0391 17.0391 16.8502 17.0391 16.6172V13.3828C17.0391 13.1498 16.8502 12.9609 16.6172 12.9609H13.3828Z"
        fill="white"
      />
    </G>
    <Rect x="5.85" y="5.85" width="18.3" height="18.3" rx="9.15" stroke="#64748B" stroke-width="0.3" />
    <Defs>
      <ClipPath id="clip0_4256_162797">
        <Rect x="6" y="6" width="18" height="18" rx="9" fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default CoinbaseWalletIcon;
