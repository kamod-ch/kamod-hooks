import { useLayoutEffect } from 'preact/hooks';
import createEffectWithTarget from './createEffectWithTarget';

const useEffectWithTarget = createEffectWithTarget(useLayoutEffect);

export default useEffectWithTarget;
