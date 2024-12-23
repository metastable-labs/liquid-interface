import { StyleSheet } from 'react-native';

import { LQDOnboardingStep } from '@/components/onboarding';

const Step4 = () => {
  const image = require('../../assets/images/onboarding3.png');
  const arc = require('../../assets/images/onboardingStep1Arc.png');
  const arc1 = require('../../assets/images/onboardingStep1Arc1.png');

  return (
    <LQDOnboardingStep
      image={image}
      title="Explore top Strategies"
      subtitle="One app, one account, multiple protocols."
      containerStyle={{ backgroundColor: '#FFF' }}
      firstArc={arc}
      imageStyle={{ left: '24%' }}
      firstArcStyle={styles.firstArc}
      secondArc={arc1}
      secondArcStyle={styles.secondArc}
    />
  );
};

export default Step4;

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
