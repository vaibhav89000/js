function createSetTimout() {
  var timerId = 0;
  var timerMapper = {};

  function setTimoutPolyfill(cb, delay, ...args) {
    var id = timerId++;
    timerMapper[id] = true;
    var start = Date.now();
    function timoutRecursiveFunc() {
      if (!timerMapper[id]) return;
      if (Date.now() > start + delay) {
        // cb(); we can use this but if want to give args also blow way is need to be used
        cb.apply(this, args);
      } else {
        requestIdleCallback(timoutRecursiveFunc);
      }
    }
    requestIdleCallback(timoutRecursiveFunc);
    return id;
  }

  function clearTimeoutPolyfill(id) {
    delete timerMapper[id];
  }

  return { setTimoutPolyfill, clearTimeoutPolyfill };
}

const { setTimoutPolyfill, clearTimeoutPolyfill } = createSetTimout();
console.log("start");
setTimoutPolyfill(
  (name) => {
    console.log("setTimeout completed");
    console.log(`My name is ${name}`);
  },
  1000,
  "jane"
);
console.log("End");
