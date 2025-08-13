export const useBufferPolygons = () => {
  const buffer = {
    polygons: [],
  };

  const setBufferPolygons = (newPolygons) => (buffer.polygons = newPolygons);

  const getBufferPolygons = () => [...buffer.polygons];

  const addPolygonToBuffer = (polygon) => buffer.polygons.push(polygon);

  const removePolygonFromBuffer = (polygonId) => {
    buffer.polygons = buffer.polygons.filter(({ id }) => id !== polygonId);
  };

  return {
    getBufferPolygons,
    setBufferPolygons,
    addPolygonToBuffer,
    removePolygonFromBuffer,
  };
};
