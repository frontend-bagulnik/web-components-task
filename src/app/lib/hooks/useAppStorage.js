const appStorageKey = {
  bufferContainerData: "bufferContainerData",
  canvasData: "canvasData",
};

export const useAppStorage = () => {
  const loadAppData = () => {
    const parseLoadedData = (data) => JSON.parse(data);
    const load = (key) => window.localStorage.getItem(key);

    const { bufferContainerData } = appStorageKey;

    return {
      bufferPolygons: parseLoadedData(load(bufferContainerData)),
    };
  };

  const saveAppData = (bufferPolygons) => {
    const { bufferContainerData } = appStorageKey;
    window.localStorage.setItem(
      bufferContainerData,
      JSON.stringify(bufferPolygons),
    );
  };

  const clearAppData = () => {
    const clear = (key) => window.localStorage.removeItem(key);

    const { bufferContainerData } = appStorageKey;

    clear(bufferContainerData);
  };

  return {
    loadAppData,
    saveAppData,
    clearAppData,
  };
};
