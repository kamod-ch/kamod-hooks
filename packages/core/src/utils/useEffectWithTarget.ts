import { useEffect } from 'preact/hooks';
import createEffectWithTarget from './createEffectWithTarget';

const useEffectWithTarget = createEffectWithTarget(useEffect);

export default useEffectWithTarget;
