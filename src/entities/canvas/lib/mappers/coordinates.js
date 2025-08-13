export const mapScreenCoordinatesToCanvas = (
  canvas,
  { clientX, clientY },
  { x, y, scale },
) => {
  const rect = canvas.getBoundingClientRect();

  return {
    canvasX: (clientX - rect.left - x) / scale,
    canvasY: (clientY - rect.top - y) / scale,
  };
};
