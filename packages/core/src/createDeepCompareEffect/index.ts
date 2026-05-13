import { useEffect, useLayoutEffect, useRef } from 'preact/hooks';
import type { DependencyList } from '#types';
import { depsEqual } from '../utils/depsEqual';

type EffectHookType = typeof useEffect | typeof useLayoutEffect;

type CreateUpdateEffect = (hook: EffectHookType) => EffectHookType;

export const createDeepCompareEffect: CreateUpdateEffect = (hook) => (effect, deps) => {
  const ref = useRef<DependencyList | undefined>(undefined);
  const signalRef = useRef<number>(0);
  if (deps === undefined || !depsEqual(deps, ref.current)) {
    signalRef.current += 1;
  }
  ref.current = deps;
  hook(effect, [signalRef.current]);
};
