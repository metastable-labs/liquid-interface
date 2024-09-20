interface ILQDOnboardingIndicator {
  timer: number;
  isPaused: boolean;
  currentStep: number;
  totalSteps: number;
  togglePause: () => void;
  finished: boolean;
}
