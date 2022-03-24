import useShortLivedInput from "./useShortLivedInput";

function useOptionFocus(options) {
  const [text, input] = useShortLivedInput();

  function handleKeyDown(e) {
    const focusedIndex = options.indexOf(document.activeElement);

    if (["ArrowDown", "ArrowUp"].includes(e.key)) {
      // cycle through options up and down using arrow keys
      e.preventDefault();
      const nextFocusedIndex = focusedIndex + (e.key === "ArrowDown" ? 1 : -1);
      const boundedNextIndex =
        nextFocusedIndex < 0
          ? options.length - 1
          : nextFocusedIndex % options.length;

      options[boundedNextIndex]?.focus();
    } else {
      // Find a matching options from a short lived user input
      // First we check after the selected option, the we check all the options
      // This allows for cycling through options when typing the same letter repeatedly
      if (text.current !== e.key) {
        // prevent buffering the same char, to allow cycling through options even when the user is spamming the same letter
        input(e.key);
      }
      const searchOffset = text.current.length === 1 ? 1 : 0; // to allow cycling through options when spamming different letters
      const afterFocusedOptions = options.slice(focusedIndex + searchOffset);
      const matchingOptionAfterFocused = afterFocusedOptions.find(option =>
        option.textContent.toLowerCase().startsWith(text.current)
      );
      if (matchingOptionAfterFocused != null) {
        matchingOptionAfterFocused.focus();
        return;
      }
      const matchingOption = options.find(option =>
        option.textContent.toLowerCase().startsWith(text.current)
      );
      matchingOption?.focus();
    }
  }

  return handleKeyDown;
}

export default useOptionFocus;
