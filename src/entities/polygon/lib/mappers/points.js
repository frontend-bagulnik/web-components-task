export const mapPolygonPointsToSvgPoints = (points) =>
  points.map(({ x, y }) => `${x},${y}`).join(" ");
