import { useIsomorphicLayoutEffect } from 'libs/hooks';
import { useCallback, useRef } from 'react';

export function useEventCallback<Args extends unknown[], R>(
  fn: (...args: Args) => R
) {
  const ref = useRef<typeof fn>(() => {
    throw new Error('Cannot call an event handler while rendering.');
  });

  useIsomorphicLayoutEffect(() => {
    ref.current = fn;
  }, [fn]);

  return useCallback((...args: Args) => ref.current(...args), [ref]);
}
