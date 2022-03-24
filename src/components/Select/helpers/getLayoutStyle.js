function getLayoutStyle(boundingRect) {
  const { x = 0, y = 0, height = 0, width = "100%" } = boundingRect;
  return {
    top: y + height,
    left: x,
    minWidth: width,
  };
}

export default getLayoutStyle;
