import Svg, { Path } from 'react-native-svg';

const SupportIcon = () => {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M17 18.4302H13L8.54999 21.3902C7.88999 21.8302 7 21.3602 7 20.5602V18.4302C4 18.4302 2 16.4302 2 13.4302V7.43018C2 4.43018 4 2.43018 7 2.43018H17C20 2.43018 22 4.43018 22 7.43018V13.4302C22 16.4302 20 18.4302 17 18.4302Z"
        stroke="#0C0507"
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 11.3599V11.1499C12 10.4699 12.42 10.1099 12.84 9.81989C13.25 9.53989 13.66 9.1799 13.66 8.5199C13.66 7.5999 12.92 6.85986 12 6.85986C11.08 6.85986 10.34 7.5999 10.34 8.5199"
        stroke="#0C0507"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path d="M11.9955 13.75H12.0045" stroke="#0C0507" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
};

export default SupportIcon;
