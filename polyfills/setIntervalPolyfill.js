import createSetTimout from "./setTimoutPolyfill.js";

function createSetInterval() {
  var intervalId = 1;
  var intervalMap = {};
  const { setTimoutPolyfill, clearTimeoutPolyfill } = createSetTimout();

  function setTimeIntervalPolyfill(cb, delay, ...args) {
    var id = intervalId++;

    function reIterate() {
      intervalMap[id] = setTimoutPolyfill(() => {
        // cb();
        cb.apply(this, args);
        if (intervalMap[id]) {
          reIterate();
        }
      }, delay);
    }
    reIterate();
    return id;
  }

  function clearIntervalPolyfill(id) {
    clearTimeoutPolyfill(intervalMap[id]);
    delete intervalMap[id];
  }
  return { setTimeIntervalPolyfill, clearIntervalPolyfill };
}

const { setTimeIntervalPolyfill, clearIntervalPolyfill } = createSetInterval();

var counter = 0;
var id = setTimeIntervalPolyfill(() => {
  console.log(`setInterval running counter: ${counter}`);
  counter++;
  if (counter > 3) {
    clearIntervalPolyfill(id);
    console.log("Stopped setInterval");
  }
}, 1000);
