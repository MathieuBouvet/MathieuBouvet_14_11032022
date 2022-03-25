import { useCallback } from "react";
import useShortLivedInput from "./useShortLivedInput";
import useListOfRef from "../../../hooks/useListOfRef";

function useOptionFocus() {
  const [text, input] = useShortLivedInput();
  const [optionRefs, registerOption] = useListOfRef();

  const focusFirstOption = useCallback(() => {
    optionRefs.current[0]?.focus();
  }, [optionRefs]);

  function handleOptionFocus(e) {
    const options = optionRefs.current;
    const focusedIndex = options.indexOf(document.activeElement);

    if (["ArrowDown", "ArrowUp"].includes(e.key)) {
      // cycle up and down through options using arrow keys
      e.preventDefault();
      const nextFocusedIndex = focusedIndex + (e.key === "ArrowDown" ? 1 : -1);
      const boundedNextIndex =
        nextFocusedIndex < 0
          ? options.length - 1
          : nextFocusedIndex % options.length;

      options[boundedNextIndex]?.focus();
    } else {
      // Find a matching options from a short lived user input.
      // We will try to find the first matching option, starting
      // from the currently focused option (or the next option, cf below)
      if (text.current !== e.key) {
        // the user is starting to search, or is not spamming the same letter : we register his input
        // if the user is spamming the same letter, we do not register his input,
        // because he wants to go through options starting with this letter
        // for example, if he is spamming "a", he wants to go through all options starting with "a". He is not searching for an option starting with several "a".
        input(e.key);
      }
      // if the user is spamming the same letter, we start the search at the next option (skipping the currently focused option)
      // and this will cycle through options starting with the spammed letter
      const startIndex = focusedIndex + (text.current.length === 1 ? 1 : 0);
      const reorderedOptions = [
        ...options.slice(startIndex),
        ...options.slice(0, startIndex),
      ];
      const matchingOption = reorderedOptions.find(option =>
        option.textContent.toLowerCase().startsWith(text.current)
      );
      matchingOption?.focus();
    }
  }

  return {
    handleOptionFocus,
    registerOption,
    focusFirstOption,
  };
}

export default useOptionFocus;
