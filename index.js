import Broker from "./broker";
function eventBus() {
  // 中间人
  const broker = new Broker();
  return {
    /**
     * 触发所有订阅者事件
     * 因为可能在同一个任务队列中既有订阅者也有发布者，所以使用setTimeOut等待绑定所有订阅者。
     * 然后在下一个任务队列中触发发布者，以便于在同一队列中可以触发在发布前订阅的事件
     * @param {String} eventName 事件名称
     * @param  {...any} rest 其余参数
     */
    emit(eventName, ...rest) {
      setTimeout(() => {
        broker.publisher(eventName, ...rest);
      }, 0);
    },
    /**
     * 监听发布者事件
     * @param {String} eventName 监听的事件名称
     * @param {function} callback 回调函数
     */
    on(eventName, callback) {
      broker.addSubscriber(eventName, callback);
    }
  };
}
export default eventBus();
