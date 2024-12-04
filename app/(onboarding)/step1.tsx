import { StyleSheet } from 'react-native';

import { LQDOnboardingStep } from '@/components/onboarding';

const Step1 = () => {
  const image = require('../../assets/images/onboarding1.png');
  const arc = require('../../assets/images/onboardingStep1Arc.png');
  const arc1 = require('../../assets/images/onboardingStep1Arc1.png');

  return (
    <LQDOnboardingStep
      image={image}
      firstArc={arc}
      secondArc={arc1}
      title="Discover DeFi strategies easily"
      subtitle="Earn more with your money, securely"
      containerStyle={{ backgroundColor: '#FFF' }}
      imageStyle={{ left: '24%' }}
      firstArcStyle={styles.firstArc}
      secondArcStyle={styles.secondArc}
    />
  );
};

export default Step1;

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
