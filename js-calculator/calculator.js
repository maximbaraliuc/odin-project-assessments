"use strict";

// let numberA;
// let numberB;
// let arithmeticOperator;

let operatorCounter = 0;

// CALCULATOR FUNCTIONS

// Operate should have a function  that converts the string of a and b
// to a number when doing the conversion ;) OR JUST A CONVERTOR WHEN SAVING ???????

let operate = {
  a: null,
  b: null,
  arithmeticOperator: null,

  // strToNumber: function (str) {
  //   a
  // }, ????????????????????????????

  add: function () {
    return this.a + this.b;
  },

  subtract: function () {
    return this.a - this.b;
  },

  multiply: function () {
    return this.a * this.b;
  },

  divide: function () {
    return this.a / this.b;
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

// Displays number (as a string). Checks the length - RESOLVE LATER !!!!!!!!!!!!!!!1111
// TODO - bugs when zero is clicked first
// TODO it is possible to simplify the function, and to reduce numberToDisplay

let returnValue = function () {
  // console.log(this.value, Number(this.value));
  numberToDisplay += this.value;
  populateNumbers(numberToDisplay); // Populates the display with each number button push.
  // return this.value;
};
numberButtons.forEach((button) => button.addEventListener("click", returnValue));

let operatorButtons = document.querySelectorAll(".operator");
// Save the numA
// Save the numB
// Save operator

let returnOperator = function () {
  // console.log(this.value, typeof this.value);

  // The operator is clicked as a first button. Nothing changes but the display.
  if (numberToDisplay === "" && operate.arithmeticOperator === null) {
    operatorToDisplay = this.value;
    populateOperator(operatorToDisplay);
    return;

    // When the operator is clicked and  there is already a number stored in memory.
    // Selecting the operator multiple times in a row displays the new operator
  } else if (numberToDisplay === "") {
    // No number clicked.
    operatorToDisplay = this.value;
    operate.arithmeticOperator = operatorToDisplay;
    populateOperator(operatorToDisplay);
    return;
  }

  // A. Store first number - operate.a
  if (operatorCounter === 0) {
    operatorToDisplay = this.value;
    populateOperator(operatorToDisplay);

    operate.a = +numberToDisplay;
    numberToDisplay = "";

    operate.arithmeticOperator = operatorToDisplay;
    populateNumbers(operate.a);

    operatorCounter = 1;
  }

  // B. Store first number - operate.b
  if (operatorCounter === 1) {
    operatorToDisplay = this.value;
    populateOperator(operatorToDisplay);

    operate.b = +numberToDisplay;
    numberToDisplay = "";
    // RUN THE CALCULATIONS
    operate.a = operate[operate.arithmeticOperator]();
    operate.arithmeticOperator = operatorToDisplay;
    populateNumbers(operate.a);
    operatorCounter = 1;
  }
};
operatorButtons.forEach((button) => button.addEventListener("click", returnOperator));
