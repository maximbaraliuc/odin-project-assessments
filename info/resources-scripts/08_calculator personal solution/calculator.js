const add = function (a, b) {
  return a + b;
};

const subtract = function (a, b) {
  return a - b;
};

const sum = function (arr) {
  let result = 0;
  arr.forEach((element) => {
    result += element;
  });
  return result;
};

const multiply = function (arr) {
  let result = 1;
  arr.forEach((element) => {
    result *= element;
  });
  return result;
};

const power = function (a, b) {
  let result = a;
  for (i = 1; i < b; i++) {
    result *= a;
  }
  return result;
};

const factorial = function (a) {
  let result = 1;
  if (a === 0) {
    return result;
  } else {
    for (i = 1; i <= a; i++) {
      result *= i;
    }
  }
  return result;
};

// Do not edit below this line
module.exports = {
  add,
  subtract,
  sum,
  multiply,
  power,
  factorial,
};
