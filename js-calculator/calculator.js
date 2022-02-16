// CALCULATOR FUNCTIONS

let operate = {
  add: function (a, b) {
    return a + b;
  },

  subtract: function (a, b) {
    return a - b;
  },

  multiply: function (a, b) {
    return a * b;
  },

  divide: function (a, b) {
    return a / b;
  },
};

// DISPLAY
let numberDisplay = document.querySelector(".number-display");
let operatorDisplay = document.querySelector(".operator-display");

let numberToDisplay = ""; // Maybe  should be transformed into a function ?
let operatorToDisplay = "";

let populateNumbers = function (toDisplay) {
  numberDisplay.textContent = toDisplay;
};

let populateOperator = function (toDisplay) {
  operatorDisplay.textContent = toDisplay;
};
// ======================

let numberA;
let numberB;
let arithmeticOperator;

// Buttons value (equals to operator) should be the same string as functions names above.
// const operate = function (operator, a, b) {
//   return operator(a, b);
// };

/* // Check the value and names on click TEMPORARY CODE =========================
// Audio for key sounds
let clickDown = new Audio("audio/button-down.mp3");
let clickUp = new Audio("audio/button-up.mp3");

let buttonsValue = document.querySelectorAll("button");
buttonsValue.forEach((button) =>
  button.addEventListener(
    "pointerdown",
    function () {
      // console.log("value:", this.value);
      // console.log("typeof value:", typeof this.value);
      // console.log("name:", this.name);
      // console.log("typeof name:", typeof this.name);
      return clickDown.play();
    },
    button.addEventListener("pointerup", function () {
      return clickUp.play();
    })
  )
); // ======================================================================== */

let numberButtons = document.querySelectorAll(".number");
let returnValue = function () {
  console.log(this.value, Number(this.value));
  numberToDisplay += this.value;
  populateNumbers(numberToDisplay); // Populates the display with each number button push.
  // return this.value;
};
numberButtons.forEach((button) => button.addEventListener("click", returnValue));

let operatorButtons = document.querySelectorAll(".operator");
let returnOperator = function () {
  console.log(this.value, typeof this.value);
  operatorToDisplay = this.value;
  populateOperator(operatorToDisplay);
};
operatorButtons.forEach((button) => button.addEventListener("click", returnOperator));
