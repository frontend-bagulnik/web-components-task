export const bufferContainerEvents = {
  ELEMENT_DROPPED: "ELEMENT_DROPPED",
};

const createBufferContainerEvent = (event) =>
  new CustomEvent(event, { composed: true, bubbles: true });

export const createElementDroppedEvent = () =>
  createBufferContainerEvent(bufferContainerEvents.ELEMENT_DROPPED);
