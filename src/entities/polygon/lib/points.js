import convexHull from "convex-hull";
import { useArrayRange } from "@shared/lib/hooks/useArrayRange";

export const createPolygonPoints = (pointsCount, maxWidth, maxHeight) => {
  const vertices = useArrayRange(pointsCount).map(() => ({
    x: Math.random() * maxWidth,
    y: Math.random() * maxHeight,
  }));

  const convexHullVertices = vertices.map(({ x, y }) => [x, y]);

  return convexHull(convexHullVertices).map(([prev, next], index) => {
    if (index === 0) {
      return vertices[prev];
    }

    return vertices[next];
  });
};
