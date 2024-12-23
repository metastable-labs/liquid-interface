import Svg, { Path } from 'react-native-svg';

const CommentIcon = ({ fill = '#fff', height = 19, width = 18 }: IconProps) => (
  <Svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path
      d="M7.0835 9.25H12.9168"
      stroke="#0F172A"
      stroke-width="1.25"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <Path
      d="M5.83317 15.8582H9.1665L12.8748 18.3249C13.4248 18.6916 14.1665 18.2999 14.1665 17.6332V15.8582C16.6665 15.8582 18.3332 14.1916 18.3332 11.6916V6.69157C18.3332 4.19157 16.6665 2.5249 14.1665 2.5249H5.83317C3.33317 2.5249 1.6665 4.19157 1.6665 6.69157V11.6916C1.6665 14.1916 3.33317 15.8582 5.83317 15.8582Z"
      stroke="#0F172A"
      stroke-width="1.25"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </Svg>
);
export default CommentIcon;
