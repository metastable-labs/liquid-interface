import { LQDOnboardingStep } from "@/components/onboarding";

const Step1 = () => {
  const ray = require("../../assets/images/light-ray.png");
  const image = require("../../assets/images/onboarding1.png");

  return (
    <LQDOnboardingStep
      ray={ray}
      image={image}
      title="Start Earning up to 60% APR on your USDC"
      subtitle="Deposit Liquidity on Aerodrome pools in 3 secs"
      containerStyle={{ backgroundColor: "#1A2001" }}
      imageStyle={{ bottom: 0, right: -10, width: 200, height: 620 }}
      titleStyle={{ color: "#F7FDD8" }}
      subtitleStyle={{ color: "#DEDADA" }}
    />
  );
};

export default Step1;
