import { useCallback, useRef, useState } from 'react';
import {
  useEventListener,
  useIsomorphicEffect,
} from '../hooks/use-event-listener';

type Size = {
  width: number;
  height: number;
};

export function useElementSize<T extends HTMLElement = HTMLDivElement>(): [
  (node: T | null) => void,
  Size,
] {
  const [ref, setRef] = useState<T | null>(null);
  const [size, setSize] = useState<Size>({
    width: 0,
    height: 0,
  });
  const nodeRef = useRef<T | null>(null);

  const handleSize = useCallback(() => {
    const node = nodeRef.current;
    if (!node) return;
    const width = node.offsetWidth || 0;
    const height = node.offsetHeight || 0;
    setSize((prev) =>
      prev.width !== width || prev.height !== height ? { width, height } : prev
    );
  }, []);

  useEventListener('resize', handleSize);

  // Only run when ref changes (element mounted/unmounted) - not on offsetWidth/offsetHeight
  // Using offsetWidth/offsetHeight as deps caused infinite loop when layout changes trigger re-renders
  useIsomorphicEffect(() => {
    nodeRef.current = ref;
    handleSize();
  }, [ref, handleSize]);

  return [setRef, size];
}
