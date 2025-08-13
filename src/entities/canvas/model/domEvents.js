export const canvasDomEvents = {
  DROP_ELEMENT: "DROP_ELEMENT",
};

const createDefaultCanvasEvent = (event, detail) =>
  new CustomEvent(event, {
    composed: true,
    bubbles: true,
    detail,
  });

export const createDropElementEvent = (detail) =>
  createDefaultCanvasEvent(canvasDomEvents.DROP_ELEMENT, detail);
