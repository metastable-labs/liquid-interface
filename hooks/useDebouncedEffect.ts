import { useEffect } from 'react';
import debounce from 'lodash/debounce';

import { EffectCallbackFn } from './useOnMount';

export function useDebouncedEffect(effect: EffectCallbackFn, deps: unknown[], delay: number) {
  useEffect(() => {
    const debouncedEffect = debounce(() => {
      const cleanup = effect();
      return cleanup;
    }, delay);

    debouncedEffect();

    return () => {
      debouncedEffect.cancel();
    };
  }, deps);
}
