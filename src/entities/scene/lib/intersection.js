export const isGraphicalObjectIntersected = (x, y, object) => {
  const { points, position } = object;

  if (!points || !position) {
    return false;
  }

  const xs = points.map(({ x }) => x + position.x);
  const ys = points.map(({ y }) => y + position.y);

  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);

  return x >= minX && x <= maxX && y >= minY && y <= maxY;
};
