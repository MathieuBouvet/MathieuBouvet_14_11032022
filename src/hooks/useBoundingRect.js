import { useRef, useEffect } from "react";

function useBoundingRect() {
  const ref = useRef();

  const position = useRef();

  useEffect(() => {
    if (ref.current != null) {
      position.current = ref.current.getBoundingClientRect();
    }
  });
  return [ref, position.current];
}

export default useBoundingRect;
