var summation = function (num) {
  // Code here

  for (let n = num - 1; n >= 1; n--) {
    num += n;
  }
  return num;
};

// summation(1); // 1
summation(2); // 3
summation(8); // 36
