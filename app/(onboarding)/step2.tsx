import { LQDOnboardingStep } from '@/components/onboarding';

const Step2 = () => {
  const ray = require('../../assets/images/light-ray2.png');
  const image = require('../../assets/images/onboarding2.png');

  return (
    <LQDOnboardingStep
      ray={ray}
      image={image}
      title="Secured by smart accounts"
      subtitle="Zero gas fees, one click transactions secured with your biometrics"
      containerStyle={{ backgroundColor: '#B442B8' }}
      imageStyle={{ bottom: -50, left: 0, width: 250, height: 650 }}
      titleStyle={{ color: '#E5E3E5' }}
      subtitleStyle={{ color: '#DEDADA' }}
    />
  );
};

export default Step2;
