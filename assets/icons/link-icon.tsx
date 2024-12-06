import Svg, { Path } from 'react-native-svg';

const LinkIcon = ({ fill = '#0A0D14', height = 19, width = 18 }: IconProps) => (
  <Svg width={width} height={height} viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path
      stroke={fill}
      d="M13.7958 11.3867L12.8413 10.4309L13.7958 9.47641C14.1114 9.16352 14.3621 8.79135 14.5336 8.38129C14.705 7.97123 14.7938 7.53134 14.7947 7.08689C14.7957 6.64244 14.7089 6.20217 14.5392 5.79136C14.3696 5.38055 14.1205 5.00729 13.8062 4.69301C13.4919 4.37874 13.1187 4.12963 12.7079 3.95999C12.2971 3.79036 11.8568 3.70353 11.4123 3.70451C10.9679 3.70548 10.528 3.79423 10.1179 3.96567C9.70789 4.1371 9.33572 4.38784 9.02283 4.70349L8.06838 5.65861L7.11325 4.70416L8.06905 3.74971C8.95521 2.86356 10.1571 2.36572 11.4103 2.36572C12.6635 2.36572 13.8654 2.86356 14.7516 3.74971C15.6377 4.63587 16.1355 5.83775 16.1355 7.09096C16.1355 8.34418 15.6377 9.54606 14.7516 10.4322L13.7964 11.3867H13.7958ZM11.8869 13.2956L10.9317 14.25C10.0456 15.1362 8.84369 15.634 7.59048 15.634C6.33726 15.634 5.13538 15.1362 4.24923 14.25C3.36307 13.3639 2.86523 12.162 2.86523 10.9088C2.86523 9.65555 3.36307 8.45367 4.24923 7.56751L5.20435 6.61306L6.1588 7.56886L5.20435 8.52331C4.8887 8.83621 4.63796 9.20837 4.46653 9.61844C4.29509 10.0285 4.20634 10.4684 4.20537 10.9128C4.2044 11.3573 4.29122 11.7976 4.46086 12.2084C4.63049 12.6192 4.8796 12.9924 5.19388 13.3067C5.50815 13.621 5.88141 13.8701 6.29222 14.0397C6.70303 14.2094 7.1433 14.2962 7.58775 14.2952C8.03221 14.2942 8.47209 14.2055 8.88215 14.0341C9.29221 13.8626 9.66438 13.6119 9.97728 13.2962L10.9317 12.3418L11.8869 13.2962V13.2956ZM11.409 6.13584L12.3641 7.09096L7.59115 11.8632L6.63603 10.9088L11.409 6.13651V6.13584Z"
      fill="#0A0D14"
    />
  </Svg>
);
export default LinkIcon;
