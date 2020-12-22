export default (function () {
  const eventObj = {};
  return {
    addEventListener(eventName, callback) {
      eventObj[eventName] = callback;
    },
    dispatchEvent(eventName, ...rest) {
      if (eventObj[eventName]) {
        eventObj[eventName](...rest);
      }
    },
    removeEventListener(eventName) {
      if (eventObj[eventName]) {
        delete eventObj[eventName];
      }
    }
  };
})();
