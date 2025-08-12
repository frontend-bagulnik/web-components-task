const listeners = {};

export const subscribe = (event, callback) => {
  if (!listeners[event]) {
    listeners[event] = [];
  }

  listeners[event].push(callback);
};

export const unsubscribe = (event, callback) => {
  if (!listeners[event]) {
    return;
  }

  listeners[event] = listeners[event].filter((cb) => cb !== callback);
};

export const publishEvent = (event, data) => {
  if (!listeners[event]) {
    return;
  }

  listeners[event].forEach((callback) => callback(data));
};
