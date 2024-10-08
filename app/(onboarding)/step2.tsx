import { StyleSheet } from 'react-native';

import { LQDOnboardingStep } from '@/components/onboarding';

const Step2 = () => {
  const image = require('../../assets/images/onboarding2.png');
  const arc = require('../../assets/images/onboardingStep2Arc.png');
  const arc1 = require('../../assets/images/onboardingStep2Arc1.png');

  return (
    <LQDOnboardingStep
      image={image}
      title="Secured by smart accounts"
      subtitle="Zero gas fees, one click transactions secured with your biometrics"
      containerStyle={{ backgroundColor: '#FF4C61' }}
      imageStyle={{ left: '25%' }}
      firstArc={arc}
      firstArcStyle={styles.firstArc}
      secondArc={arc1}
      secondArcStyle={styles.secondArc}
    />
  );
};

export default Step2;

const styles = StyleSheet.create({
  firstArc: {
    height: 352,
    left: -68,
    top: 144,
  },

  secondArc: {
    height: 301,
    right: -87,
    bottom: 137,
  },
});
