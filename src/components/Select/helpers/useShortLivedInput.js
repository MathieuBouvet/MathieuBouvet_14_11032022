import { useRef } from "react";

const LIFETIME = 500;

function useShortLivedInput() {
  let timeWindow;
  const text = useRef("");

  function registerChar(char) {
    if (char.length > 1) {
      return;
    }
    clearTimeout(timeWindow);
    text.current = text.current + char;
    timeWindow = setTimeout(() => {
      text.current = "";
    }, LIFETIME);
  }

  return [text, registerChar];
}

export default useShortLivedInput;
