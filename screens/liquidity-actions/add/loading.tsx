import { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';

import LQDLoadingStep from '@/components/loading-step';
import { adjustFontSizeForIOS } from '@/utils/helpers';
import { BitcoinConvertAltIcon, DollarCoinAltIcon, MoneyAddIcon } from '@/assets/icons';

const Loading = ({ primaryTitle, secondaryTitle }: ILoading) => {
  const [loadingStep, setLoadingStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([false, false, false]);

  const loadingSteps: Array<ILQDLoadingStep> = [
    {
      icon: <BitcoinConvertAltIcon />,
      isCompleted: completedSteps[0],
      subtitle: `Swapping ${primaryTitle} to ${secondaryTitle}`,
      title: 'Swapping',
    },

    {
      icon: <DollarCoinAltIcon />,
      isCompleted: completedSteps[1],
      subtitle: `Approving ${primaryTitle} and ${secondaryTitle}`,
      title: 'Approving tokens',
    },

    {
      icon: <MoneyAddIcon />,
      isCompleted: completedSteps[2],
      subtitle: 'Depositing liquidity into pool',
      title: 'Depositing',
      isLast: true,
    },
  ];

  useEffect(() => {
    if (loadingStep < 3) {
      const timeout = setTimeout(() => {
        setCompletedSteps((prev) => prev.map((step, index) => (index === loadingStep ? true : step)));

        const interval = setTimeout(() => {
          setLoadingStep((prev) => prev + 1);
        }, 500);

        return () => clearTimeout(interval);
      }, 4000);

      return () => clearTimeout(timeout);
    }
  }, [loadingStep]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Depositing Liquidity</Text>

      <View style={styles.setupContainer}>
        {loadingSteps.map(
          (step, index) =>
            loadingStep >= index && (
              <LQDLoadingStep
                key={index}
                icon={step.icon}
                isCompleted={step.isCompleted}
                subtitle={step.subtitle}
                title={step.title}
                isLast={step.isLast}
              />
            )
        )}
      </View>
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    gap: 24,
  },

  header: {
    color: '#0F172A',
    fontSize: adjustFontSizeForIOS(24, 3),
    lineHeight: 26.88,
    letterSpacing: -0.6,
    fontWeight: '500',
    fontFamily: 'AeonikMedium',
  },

  setupContainer: { alignSelf: 'stretch', justifyContent: 'center' },
});
