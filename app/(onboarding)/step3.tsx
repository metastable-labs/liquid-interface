import { LQDOnboardingStep } from "@/components/onboarding";

const Step3 = () => {
  const ray = require("../../assets/images/light-ray2.png");
  const image = require("../../assets/images/onboarding3.png");

  return (
    <LQDOnboardingStep
      ray={ray}
      image={image}
      title="All things Liquidity, in one place"
      subtitle="One app, one account, access multiple protocols and networks"
      containerStyle={{ backgroundColor: "#536103" }}
      imageStyle={{ bottom: -50, left: 0, width: 250, height: 650 }}
      titleStyle={{ color: "#D9D9D9" }}
      subtitleStyle={{ color: "#FFF" }}
    />
  );
};

export default Step3;
