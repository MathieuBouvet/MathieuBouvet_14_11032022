import { useRef, useLayoutEffect, useEffect } from "react";

function useFlipTransition() {
  const previousPosition = useRef(null);
  const previousSize = useRef(null);
  const ref = useRef(null);

  useLayoutEffect(() => {
    const {
      x = 0,
      y = 0,
      width = 0,
      height = 0,
    } = ref.current?.getBoundingClientRect() ?? {};

    if (
      previousPosition.current !== null &&
      ref.current !== null &&
      previousSize !== null
    ) {
      const { x: previousX, y: previousY } = previousPosition.current ?? {};

      const { width: previousWidth, height: previousHeight } =
        previousSize.current;

      const deltaX = previousX - x;
      const deltaY = previousY - y;

      const widthRatio = previousWidth / width;
      const heightRatio = previousHeight / height;

      ref.current.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(${widthRatio}, ${heightRatio})`;
    }
    previousPosition.current = { x, y };
    previousSize.current = { width, height };
  });

  useEffect(() => {
    setTimeout(() => {
      if (ref.current !== null) {
        ref.current.style.transform = `translate(0, 0) scale(1,1)`;
        ref.current.style.transition = "transform ease 0.3s";
      }
    });
  });

  return ref;
}

export default useFlipTransition;
