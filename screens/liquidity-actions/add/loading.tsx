import LQDLoadingStep from '@/components/loading-step';
import { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';

const loadingIcons = [
  'journal-outline',
  'bar-chart-outline',
  'checkmark-done-circle-outline',
];

const Loading = ({ primaryTitle, secondaryTitle }: ILoading) => {
  const [loadingStep, setLoadingStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([false, false, false]);

  const loadingSteps: Array<ILQDLoadingStep> = [
    {
      icon: 'journal-outline',
      isCompleted: completedSteps[0],
      subtitle: `Swapping ${primaryTitle} to ${secondaryTitle}`,
      title: 'Swapping',
    },

    {
      icon: 'bar-chart-outline',
      isCompleted: completedSteps[1],
      subtitle: `Approving ${primaryTitle} and ${secondaryTitle}`,
      title: 'Approving tokens',
    },

    {
      icon: 'checkmark-done-circle-outline',
      isCompleted: completedSteps[2],
      subtitle: 'Depositing liquidity into pool',
      title: 'Depositing',
    },
  ];

  useEffect(() => {
    if (loadingStep < 2) {
      const timeout = setTimeout(() => {
        setCompletedSteps((prev) =>
          prev.map((step, index) => (index === loadingStep ? true : step))
        );

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
                icon={loadingIcons[index]}
                isCompleted={step.isCompleted}
                subtitle={step.subtitle}
                title={step.title}
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
    fontSize: 24,
    lineHeight: 26.88,
    letterSpacing: -0.6,
    fontWeight: '500',
    fontFamily: 'AeonikMedium',
  },

  setupContainer: { alignSelf: 'stretch', justifyContent: 'center' },
});
