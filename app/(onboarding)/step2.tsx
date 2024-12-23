import { StyleSheet } from 'react-native';

import { LQDOnboardingStep } from '@/components/onboarding';

const Step2 = () => {
  const image = require('../../assets/images/onboarding2.png');
  const arc = require('../../assets/images/onboardingStep1Arc.png');
  const arc1 = require('../../assets/images/onboardingStep1Arc1.png');

  return (
    <LQDOnboardingStep
      image={image}
      title="Start earning with one click"
      subtitle="Zero gas fees, one click transactions secured with your biometrics"
      containerStyle={{ backgroundColor: '#FFF' }}
      imageStyle={{ left: '24%' }}
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
    height: 320,
    left: -57,
    top: 250,
  },

  secondArc: {
    height: 301,
    right: -66,
    bottom: 155,
  },
});
