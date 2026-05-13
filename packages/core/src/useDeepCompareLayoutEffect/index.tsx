import { useLayoutEffect } from 'preact/hooks';
import { createDeepCompareEffect } from '../createDeepCompareEffect';

export default createDeepCompareEffect(useLayoutEffect);
