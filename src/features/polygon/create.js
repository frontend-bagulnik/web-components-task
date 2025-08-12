import { v4 as uuidv4 } from "uuid";
import { polygonOptions } from "@entities/polygon/model/constants";
import { useGetRandomArbitrary } from "@shared/lib/hooks/useGetRandomArbitrary";
import { useArrayRange } from "@shared/lib/hooks/useArrayRange";
import { createPolygonPoints } from "@entities/polygon/lib/points";
import { mapPolygonPointsToSvgPoints } from "@entities/polygon/lib/mappers/points";

export const createRandomSvgPolygonData = () => {
  const polygonCount = useGetRandomArbitrary(5, 20);
  const buffer = useArrayRange(polygonCount);

  return buffer.map(() => createSvgPolygonData());
};

export const createSvgPolygonData = () => {
  const { svgPolygonWidth: width, svgPolygonHeight: height } = polygonOptions;

  return {
    id: uuidv4(),
    points: createPolygonPoints(10, width, height),
    options: {
      width,
      height,
    },
  };
};

export const createPolygonSvgElement = ({ id, points, options }) => {
  const mappedPoints = mapPolygonPointsToSvgPoints(points);

  const element = document.createElement("polygon-svg");
  element.id = id;
  element.points = mappedPoints;
  element.width = options.width;
  element.height = options.height;

  return element;
};
