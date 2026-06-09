import { useRef } from 'preact/hooks';
import useLatest from '../useLatest';
import useMount from '../useMount';
import { isString } from '../utils';
import type { BasicTarget } from '../utils/domTarget';
import { getTargetElement } from '../utils/domTarget';
import useEffectWithTarget from '../utils/useEffectWithTarget';

export interface Options {
  onDragStart?: (event: DragEvent) => void;
  onDragEnd?: (event: DragEvent) => void;
  dragImage?: {
    image: string | Element;
    offsetX?: number;
    offsetY?: number;
  };
}

const useDrag = <T>(data: T, target: BasicTarget, options: Options = {}) => {
  const optionsRef = useLatest(options);
  const dataRef = useLatest(data);
  const imageElementRef = useRef<Element | undefined>(undefined);

  useMount(() => {
    const { dragImage } = optionsRef.current;
    if (dragImage?.image) {
      const { image } = dragImage;

      if (isString(image)) {
        const imageElement = new Image();

        imageElement.src = image;
        imageElementRef.current = imageElement;
      } else {
        imageElementRef.current = image;
      }
    }
  });

  useEffectWithTarget(
    () => {
      const targetElement = getTargetElement(target);
      if (!targetElement || typeof (targetElement as unknown as { addEventListener?: unknown }).addEventListener !== 'function') {
        return;
      }

      const onDragStart = (event: DragEvent) => {
        optionsRef.current.onDragStart?.(event);
        event.dataTransfer!.setData('custom', JSON.stringify(dataRef.current));

        const { dragImage } = optionsRef.current;
        if (dragImage?.image && imageElementRef.current) {
          const { offsetX = 0, offsetY = 0 } = dragImage;

          event.dataTransfer!.setDragImage(imageElementRef.current, offsetX, offsetY);
        }
      };

      const onDragEnd = (event: DragEvent) => {
        optionsRef.current.onDragEnd?.(event);
      };

      if ('setAttribute' in targetElement) {
        (targetElement as Element).setAttribute('draggable', 'true');
      }

      targetElement.addEventListener('dragstart', onDragStart as any);
      targetElement.addEventListener('dragend', onDragEnd as any);

      return () => {
        targetElement.removeEventListener('dragstart', onDragStart as any);
        targetElement.removeEventListener('dragend', onDragEnd as any);
        if ('removeAttribute' in targetElement) {
          (targetElement as Element).removeAttribute('draggable');
        }
      };
    },
    [],
    target,
  );
};

export default useDrag;
