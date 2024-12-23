import { StrategyDetail } from '@/screens';
import { useLocalSearchParams } from 'expo-router';

const StrategyDetailScreen = () => {
  const { id } = useLocalSearchParams();

  return <StrategyDetail strategyId={id as string} />;
};

export default StrategyDetailScreen;
