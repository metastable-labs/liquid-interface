interface ILQDOnboardingIndicator {
  timer: number;
  isPaused: boolean;
  currentStep: number;
  totalSteps: number;
  progressAction: (action: "pause" | "play") => void;
  finished: boolean;
}
