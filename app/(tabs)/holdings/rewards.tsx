import { Rewards } from '@/screens';
import useSystemFunctions from '@/hooks/useSystemFunctions';

const RewardsScreen = () => {
  const { params } = useSystemFunctions();

  const { type } = params;

  return <Rewards type={type as RewardVariants} />;
};

export default RewardsScreen;
