import useSystemFunctions from '@/hooks/useSystemFunctions';
import { StrategyDetail } from '@/screens';

const PoolDetailScreen = () => {
  const { params } = useSystemFunctions();

  const { strategyId } = params;

  return <StrategyDetail strategyId={strategyId as string} />;
};

export default PoolDetailScreen;
