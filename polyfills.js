const arr = [1, 2, 3];
console.log("original", arr);

// map polyfill
Array.prototype.myMap = function (cb) {
  let newArr = [];
  for (let i = 0; i < this.length; i++) {
    newArr.push(cb(this[i], i, this));
  }
  return newArr;
};

const mapPolyfill = arr.myMap((ele, index, arr) => {
  return ele * 3;
});
console.log("map polyfill", mapPolyfill);

// filter polyfill
const filteredArray = arr.filter((ele, index, arr) => {
  return ele > 2;
});
console.log(filteredArray);

Array.prototype.myFilter = function (cb) {
  let newArr = [];
  for (let i = 0; i < this.length; i++) {
    if (cb(this[i], i, this)) {
      newArr.push(this[i]);
    }
  }
  return newArr;
};

const filteredPolyfill = arr.myFilter((ele, index, arr) => {
  return ele > 2;
});
console.log("filter polyfill", filteredPolyfill);

// reduce polyfill
const reduceArray = arr.reduce((acc, ele, index, arr) => {
  return acc + ele;
});
console.log(reduceArray);

Array.prototype.myReduce = function (cb, acc) {
  let accumulator = acc;
  for (let i = 0; i < this.length; i++) {
    if (accumulator) {
      accumulator = cb(accumulator, this[i], i, this);
    } else {
      accumulator = this[i];
    }
  }
  return accumulator;
};

const reducepolyfill = arr.myReduce((acc, ele, index, arr) => {
  return acc + ele;
});
console.log("reducepolyfill", reducepolyfill);

// call polyfill

let user = {
  firstName: "jane",
  lastName: "sane",
};
function fullname(gender, age) {
  console.log(
    `${this.firstName} ${this.lastName} is ${age} years old and ${gender}`
  );
}
fullname.call(user, "male", 18);

Function.prototype.myCall = function (context = {}, ...args) {
  if (typeof this !== "function") {
    throw new Error(this + "its not callable");
  }

  context.fn = this;
  context.fn(...args);
};
fullname.myCall(user, "male", 18);

// apply polyfill

fullname.apply(user, ["male", 18]);

Function.prototype.myApply = function (context = {}, args = []) {
  if (typeof this !== "function") {
    throw new Error(this + "its not callable");
  }
  if (!Array.isArray(args)) {
    throw new Error(this + "CreateListFromArrayLike called on non object");
  }

  context.fn = this;
  context.fn(...args);
};
fullname.myApply(user, ["male", 18]);

// bind polyfill
const bindfullname = fullname.bind(user, "male");
bindfullname(18);

Function.prototype.myBind = function (context = {}, ...args1) {
  if (typeof this !== "function") {
    throw new Error(this + "its not callable");
  }
  context.fn = this;
  return function (...args2) {
    context.fn(...args1, ...args2);
  };
};
const bindfullnamePolyfill = fullname.myBind(user, "male");
bindfullnamePolyfill(18);

// Promise polyfill
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(2);
  }, 2000);
});

promise.then((res) => console.log(res)).catch((err) => console.log(err));

function myPromisePolyfill(executor) {
  let onResolve;
  let onReject;
  let isFulfilled = false;
  let isRejected = false;
  let isCalled = false;
  let value;
  let error;

  function resolve(val) {
    isFulfilled = true;
    value = val;
    if (typeof onResolve === "function" && !isCalled) {
      isCalled = true;
      onResolve(val);
    }
  }

  function reject(err) {
    isRejected = true;
    error = err;
    if (typeof onReject === "function" && !isCalled) {
      isCalled = true;
      onReject(err);
    }
  }

  this.then = function (thenHandler) {
    onResolve = thenHandler;
    if (isFulfilled && !isCalled) {
      onResolve(value);
      isCalled = true;
    }
    return this;
  };
  this.catch = function (errorHandler) {
    onReject = errorHandler;
    if (isRejected && !isCalled) {
      onReject(error);
      isCalled = true;
    }
    return this;
  };

  executor(resolve, reject);
}

myPromisePolyfill.resolve = (val) => {
  return new myPromisePolyfill(function executor(resolve, reject) {
    resolve(val);
  });
};
myPromisePolyfill.reject = (val) => {
  return new myPromisePolyfill(function executor(resolve, reject) {
    reject(val);
  });
};

const newPromise = new myPromisePolyfill((resolve, reject) => {
  setTimeout(() => {
    resolve(3);
  }, 2000);
});

newPromise
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
myPromisePolyfill.resolve(4).then((res) => console.log(res));
myPromisePolyfill.reject(2).catch((res) => console.log(res));

// Promiseall polyfill
myPromisePolyfill.all = function (promises) {
  return new myPromisePolyfill(function executor(resolve, reject) {
    let cnt = 0;
    let res = [];

    if (promises.length === 0) {
      resolve(promises);
      return;
    }
    for (let i = 0; i < promises.length; i++) {
      promises[i]
        .then((val) => {
          onDone(i, val);
        })
        .catch((err) => reject(err));
    }
    function onDone(i, val) {
      res[i] = val;
      ++cnt;
      if (cnt === promises.length) {
        resolve(res);
      }
    }
  });
};

myPromisePolyfill.all([promise, promise]).then((res) => console.log(res));

//
