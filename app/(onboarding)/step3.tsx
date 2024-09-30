import { StyleSheet } from 'react-native';

import { LQDOnboardingStep } from '@/components/onboarding';

const Step3 = () => {
  const image = require('../../assets/images/onboarding3.png');
  const arc = require('../../assets/images/onboardingStep3Arc.png');
  const arc1 = require('../../assets/images/onboardingStep3Arc1.png');

  return (
    <LQDOnboardingStep
      image={image}
      title="All things Liquidity, in one place"
      subtitle="One app, one account, multiple protocols."
      containerStyle={{ backgroundColor: '#B14DFF' }}
      firstArc={arc}
      firstArcStyle={styles.firstArc}
      secondArc={arc1}
      secondArcStyle={styles.secondArc}
    />
  );
};

export default Step3;

const styles = StyleSheet.create({
  firstArc: {
    height: 352,
    left: -48,
    top: 218,
  },

  secondArc: {
    height: 301,
    right: -64,
    bottom: 104,
  },
});
