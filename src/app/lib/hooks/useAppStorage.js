const appStorageKey = {
  bufferContainerData: "bufferContainerData",
  canvasData: "canvasData",
};

export const useAppStorage = () => {
  const loadAppData = () => {
    const parseLoadedData = (data) => JSON.parse(data);
    const load = (key) => window.localStorage.getItem(key);

    const { bufferContainerData, canvasData } = appStorageKey;

    return {
      bufferPolygons: parseLoadedData(load(bufferContainerData)),
      scenePolygons: parseLoadedData(load(canvasData)),
    };
  };

  const saveAppData = (bufferPolygons, scenePolygons) => {
    const save = (key, data) =>
      window.localStorage.setItem(key, JSON.stringify(data));

    const { bufferContainerData, canvasData } = appStorageKey;

    save(bufferContainerData, bufferPolygons);
    save(canvasData, scenePolygons);
  };

  const clearAppData = () => {
    const clear = (key) => window.localStorage.removeItem(key);

    const { bufferContainerData, canvasData } = appStorageKey;

    clear(bufferContainerData);
    clear(canvasData);
  };

  return {
    loadAppData,
    saveAppData,
    clearAppData,
  };
};
