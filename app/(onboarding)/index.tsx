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
      title="DeFi made easy"
      subtitle="Deposit Liquidity on Aerodrome pools in 3 seconds"
      containerStyle={{ backgroundColor: '#4691FE' }}
      imageStyle={{ left: 6 }}
      firstArcStyle={styles.firstArc}
      secondArcStyle={styles.secondArc}
    />
  );
};

export default Step1;

const styles = StyleSheet.create({
  firstArc: {
    height: 352,
    left: -57,
    top: 82,
  },

  secondArc: {
    height: 301,
    right: -66,
    bottom: 155,
  },
});
