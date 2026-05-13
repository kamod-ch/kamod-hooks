import { useEffect, useState, useRef } from 'preact/hooks';
import domFullscreen from '../utils/domFullscreen';
import useLatest from '../useLatest';
import useMemoizedFn from '../useMemoizedFn';
import type { BasicTarget } from '../utils/domTarget';
import { getTargetElement } from '../utils/domTarget';
import { isBoolean } from '../utils';

export interface PageFullscreenOptions {
  className?: string;
  zIndex?: number;
}

export interface Options {
  onExit?: () => void;
  onEnter?: () => void;
  pageFullscreen?: boolean | PageFullscreenOptions;
}

const useFullscreen = (target: BasicTarget, options?: Options) => {
  const { onExit, onEnter, pageFullscreen = false } = options || {};
  const { className = 'ahooks-page-fullscreen', zIndex = 999999 } =
    isBoolean(pageFullscreen) || !pageFullscreen ? {} : pageFullscreen;

  const onExitRef = useLatest(onExit);
  const onEnterRef = useLatest(onEnter);

  // The state of full screen may be changed by other scripts/components,
  // so the initial value needs to be computed dynamically.
  const [state, setState] = useState(getIsFullscreen);
  const stateRef = useRef(getIsFullscreen());

  function getIsFullscreen() {
    return (
      domFullscreen.isEnabled &&
      !!domFullscreen.element &&
      domFullscreen.element === getTargetElement(target)
    );
  }

  const invokeCallback = (fullscreen: boolean) => {
    if (fullscreen) {
      onEnterRef.current?.();
    } else {
      onExitRef.current?.();
    }
  };

  const updateFullscreenState = (fullscreen: boolean) => {
    // Prevent repeated calls when the state is not changed.
    if (stateRef.current !== fullscreen) {
      invokeCallback(fullscreen);
      setState(fullscreen);
      stateRef.current = fullscreen;
    }
  };

  const onScreenfullChange = () => {
    const fullscreen = getIsFullscreen();

    updateFullscreenState(fullscreen);
  };

  const togglePageFullscreen = (fullscreen: boolean) => {
    const el = getTargetElement(target);
    if (!el) {
      return;
    }

    let styleElem = document.getElementById(className);

    if (fullscreen) {
      el.classList.add(className);

      if (!styleElem) {
        styleElem = document.createElement('style');
        styleElem.setAttribute('id', className);
        styleElem.textContent = `
          .${className} {
            position: fixed; left: 0; top: 0; right: 0; bottom: 0;
            width: 100% !important; height: 100% !important;
            z-index: ${zIndex};
          }`;
        el.appendChild(styleElem);
      }
    } else {
      el.classList.remove(className);

      if (styleElem) {
        styleElem.remove();
      }
    }

    updateFullscreenState(fullscreen);
  };

  const enterFullscreen = () => {
    const el = getTargetElement(target);
    if (!el) {
      return;
    }

    if (pageFullscreen) {
      togglePageFullscreen(true);
      return;
    }
    if (domFullscreen.isEnabled) {
      try {
        domFullscreen.request(el);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const exitFullscreen = () => {
    const el = getTargetElement(target);
    if (!el) {
      return;
    }

    if (pageFullscreen) {
      togglePageFullscreen(false);
      return;
    }
    if (domFullscreen.isEnabled && domFullscreen.element === el) {
      domFullscreen.exit();
    }
  };

  const toggleFullscreen = () => {
    if (state) {
      exitFullscreen();
    } else {
      enterFullscreen();
    }
  };

  useEffect(() => {
    if (!domFullscreen.isEnabled || pageFullscreen) {
      return;
    }

    domFullscreen.on('change', onScreenfullChange);

    return () => {
      domFullscreen.off('change', onScreenfullChange);
    };
  }, []);

  return [
    state,
    {
      enterFullscreen: useMemoizedFn(enterFullscreen),
      exitFullscreen: useMemoizedFn(exitFullscreen),
      toggleFullscreen: useMemoizedFn(toggleFullscreen),
      isEnabled: domFullscreen.isEnabled,
    },
  ] as const;
};

export default useFullscreen;
