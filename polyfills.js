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
