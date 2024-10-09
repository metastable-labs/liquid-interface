import useSystemFunctions from '@/hooks/useSystemFunctions';
import { PoolDetail } from '@/screens';

const PoolDetailScreen = () => {
  const { params } = useSystemFunctions();

  const { poolId } = params;

  return <PoolDetail poolId={poolId as string} />;
};

export default PoolDetailScreen;
