function makeOptionCycler(options) {
  return e => {
    if (["ArrowDown", "ArrowUp"].includes(e.code)) {
      const focusedIndex = options.indexOf(document.activeElement);
      const nextFocusedIndex = focusedIndex + (e.code === "ArrowDown" ? 1 : -1);
      const boundedNextIndex =
        nextFocusedIndex < 0
          ? options.length - 1
          : nextFocusedIndex % options.length;

      options[boundedNextIndex]?.focus();
    }
  };
}
export default makeOptionCycler;