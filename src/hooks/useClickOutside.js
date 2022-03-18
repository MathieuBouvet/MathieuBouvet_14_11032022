import { useRef, useEffect } from "react";

function useClickOutside(onClickOutside) {
  const ref = useRef();

  useEffect(() => {
    function handleClick(e) {
      console.log(e.target);
      if (ref.current != null && !ref.current.contains(e.target)) {
        onClickOutside(e);
      }
    }
    document.addEventListener("click", handleClick);

    return () => document.removeEventListener("click", handleClick);
  });

  return ref;
}

export default useClickOutside;
