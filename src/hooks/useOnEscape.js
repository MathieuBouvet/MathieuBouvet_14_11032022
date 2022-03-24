import { useEffect } from "react";

function useOnEscape(onEscape) {
  useEffect(() => {
    function handleEscape(e) {
      if (e.code === "Escape") {
        onEscape();
      }
    }
    window.addEventListener("keydown", handleEscape);

    return () => window.removeEventListener("keydown", handleEscape);
  });
}

export default useOnEscape;
