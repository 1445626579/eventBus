import CustomEvent from "./CustomEvent";
export default class Broker {
  //添加订阅者
  addSubscriber(eventName, callback) {
    if (eventName in this && this.hasOwnProperty("a")) {
      this[eventName].push(callback);
    } else {
      Object.defineProperty(this, eventName, {
        enumerable: false,
        configurable: true,
        writable: true,
        value: [callback]
      });
      CustomEvent.addEventListener(eventName, (...rest) => {
        this[eventName].forEach(callback => {
          callback.apply(this, rest);
        });
      });
    }
  }
  // 发布者发布
  publisher(eventName, ...rest) {
    CustomEvent.dispatchEvent(eventName, ...rest);
  }
}
