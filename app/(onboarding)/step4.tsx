import { LQDOnboardingStep } from "@/components/onboarding";

const Step4 = () => {
  const ray = require("../../assets/images/light-ray.png");
  const image = require("../../assets/images/onboarding4.png");

  return (
    <LQDOnboardingStep
      ray={ray}
      image={image}
      title="Migrate & Import Liquidity Positions"
      subtitle="Zero gas fees, one click transactions secured with your biometrics"
      containerStyle={{ backgroundColor: "#313131" }}
      imageStyle={{ bottom: -69, right: 0, width: 350, height: 800 }}
      titleStyle={{ color: "#E6E6E6" }}
      subtitleStyle={{ color: "#C7C7C7" }}
    />
  );
};

export default Step4;
