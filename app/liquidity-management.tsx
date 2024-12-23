import { StatusBar } from 'expo-status-bar';

import useSystemFunctions from '@/hooks/useSystemFunctions';
import { LiquidityManagement } from '@/screens';

const LiquidityManagementScreen = () => {
  const { params } = useSystemFunctions();
  const { id, type } = params;

  return (
    <>
      <StatusBar style="dark" />

      <LiquidityManagement id={id as string} type={type as 'stake' | 'unstake'} />
    </>
  );
};

export default LiquidityManagementScreen;
