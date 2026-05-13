import { useRef, useState } from "preact/hooks";
import useEventListener from "../useEventListener";
import type { BasicTarget } from "../utils/domTarget";

export interface Options {
  onFocus?: (e: FocusEvent) => void;
  onBlur?: (e: FocusEvent) => void;
  onChange?: (isFocusWithin: boolean) => void;
}

export default function useFocusWithin(target: BasicTarget, options?: Options) {
  const [isFocusWithin, setIsFocusWithin] = useState(false);
  const { onFocus, onBlur, onChange } = options || {};
  const trackingRef = useRef(false);

  useEventListener(
    "focusin",
    (e: FocusEvent) => {
      if (!trackingRef.current) {
        trackingRef.current = true;
        onFocus?.(e);
        onChange?.(true);
        setIsFocusWithin(true);
      }
    },
    {
      target
    }
  );

  useEventListener(
    "focusout",
    (e: FocusEvent) => {
      if (
        trackingRef.current &&
        !(e.currentTarget as Element)?.contains?.(e.relatedTarget as Element)
      ) {
        trackingRef.current = false;
        onBlur?.(e);
        onChange?.(false);
        setIsFocusWithin(false);
      }
    },
    {
      target
    }
  );

  return isFocusWithin;
}
