import { useEffect, useLayoutEffect, useRef } from 'preact/hooks';
import type { DependencyList, EffectCallback } from '#types';
import useUnmount from '../useUnmount';
import depsAreSame from './depsAreSame';
import type { BasicTarget } from './domTarget';
import { getTargetElement } from './domTarget';

const createEffectWithTarget = (useEffectType: typeof useEffect | typeof useLayoutEffect) => {
  /**
   *
   * @param effect
   * @param deps
   * @param target target should compare ref.current vs ref.current, dom vs dom, ()=>dom vs ()=>dom
   */
  const useEffectWithTarget = (
    effect: EffectCallback,
    deps: DependencyList,
    target: BasicTarget<any> | BasicTarget<any>[],
  ) => {
    const hasInitRef = useRef(false);

    const lastElementRef = useRef<(Element | null)[]>([]);
    const lastDepsRef = useRef<DependencyList>([]);

    const unLoadRef = useRef<(() => void) | undefined>(undefined);

    useEffectType(() => {
      const targets = Array.isArray(target) ? target : [target];
      const els = targets.map((item) => getTargetElement(item));

      // init run
      if (!hasInitRef.current) {
        hasInitRef.current = true;
        lastElementRef.current = els;
        lastDepsRef.current = deps;

        const ret = effect();
        unLoadRef.current = typeof ret === "function" ? ret : undefined;
        return;
      }

      if (
        els.length !== lastElementRef.current.length ||
        !depsAreSame(lastElementRef.current, els) ||
        !depsAreSame(lastDepsRef.current, deps)
      ) {
        unLoadRef.current?.();

        lastElementRef.current = els;
        lastDepsRef.current = deps;
        const ret2 = effect();
        unLoadRef.current = typeof ret2 === "function" ? ret2 : undefined;
      }
    });

    useUnmount(() => {
      unLoadRef.current?.();
      // for react-refresh
      hasInitRef.current = false;
    });
  };

  return useEffectWithTarget;
};

export default createEffectWithTarget;
