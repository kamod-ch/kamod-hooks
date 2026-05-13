import { useLayoutEffect } from 'preact/hooks';
import { createUpdateEffect } from '../createUpdateEffect';

export default createUpdateEffect(useLayoutEffect);
