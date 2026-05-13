import type { DependencyList } from '#types';
import { deepEqual } from './deepEqual';

export const depsEqual = (aDeps: DependencyList = [], bDeps: DependencyList = []) =>
  deepEqual(aDeps, bDeps);
