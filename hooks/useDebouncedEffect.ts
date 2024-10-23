import { useEffect } from 'react';

import { EffectCallbackFn } from './useOnMount';

export function useDebouncedEffect(effect: EffectCallbackFn, deps: unknown[], delay: number) {
  useEffect(() => {
    const handler = setTimeout(() => {
      const cleanup = effect();
      return cleanup;
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, deps);
}
