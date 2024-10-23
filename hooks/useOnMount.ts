import { useEffect } from 'react';

export type CleanupFn = () => void;
export type EffectCallbackFn = () => void | CleanupFn;

export function useOnMount(effect: EffectCallbackFn) {
  useEffect(() => {
    const cleanup = effect();
    return cleanup;
  }, []);
}
