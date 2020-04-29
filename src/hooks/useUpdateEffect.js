import { useRef, useMemo } from 'react';
import useIsMounted from './useIsMounted';

const useUpdateEffect = (effect, dependencies = []) => {
  const isMounted = useIsMounted();
  const isInitialMount = useRef(true);

  useMemo(() => {
    const clearRef = isMounted.current;
    let effectCleanupFunc = function noop() {};
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      effectCleanupFunc = effect() || effectCleanupFunc;
    }
    return () => {
      effectCleanupFunc();
      if (!clearRef) {
        isInitialMount.current = true;
      }
    };
  }, [isMounted, effect, ...dependencies]);
};

export default useUpdateEffect;

