export const headerEvents = {
  CREATE_CLICK: "CREATE_CLICK",
  CLEAR_CLICK: "CLEAR_CLICK",
  SAVE_CLICK: "SAVE_CLICK",
};

export const createDefaultHeaderEvent = (eventName) =>
  new CustomEvent(eventName, { bubbles: true, composed: true });
