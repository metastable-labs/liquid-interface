import { VerifyEmail } from '@/components';
import { useLocalSearchParams } from 'expo-router';

const SignupVerifyEmailScreen = () => {
  const params = useLocalSearchParams();

  const email = params?.email;
  return <VerifyEmail email={email as string} isSignup />;
};

export default SignupVerifyEmailScreen;
