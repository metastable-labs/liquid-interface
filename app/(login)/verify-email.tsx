import { VerifyEmail } from '@/components';
import { useLocalSearchParams } from 'expo-router';

const LoginVerifyEmailScreen = () => {
  const params = useLocalSearchParams();

  const email = params?.email;

  return <VerifyEmail email={email as string} />;
};

export default LoginVerifyEmailScreen;
