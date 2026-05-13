import { useState } from 'preact/hooks';
import useMemoizedFn from '../useMemoizedFn';

const useUpdate = () => {
  const [, setState] = useState({});

  return useMemoizedFn(() => setState({}));
};

export default useUpdate;
