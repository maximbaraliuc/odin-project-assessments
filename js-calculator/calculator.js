"use strict";

// let numberA;
// let numberB;
// let arithmeticOperator;

let operatorCounter = 0;

// CALCULATOR FUNCTIONS

// Operate should have a function  that converts the string of a and b
// to a number when doing the conversion ;) OR JUST A CONVERTOR WHEN SAVING ???????

let operate = {
  a: undefined,
  b: undefined,
  arithmeticOperator: undefined,

  // strToNumber: function (str) {
  //   a
  // }, ????????????????????????????

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

// Displays number (as a string). Checks the length - RESOLVE LATER
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
  // Change operator when clicked second time.
  // Correct the behavior when you enter the operator the first off all buttons
  if (numberToDisplay === "" && operate.arithmeticOperator === undefined) {
    operatorToDisplay = this.value;
    populateOperator(operatorToDisplay);
    return;
  } else if (numberToDisplay === "") {
    operatorToDisplay = this.value;
    operate.arithmeticOperator = operatorToDisplay;
    populateOperator(operatorToDisplay);
    return;
  }
  // A Store first number - operate.a
  if (operatorCounter === 0) {
    operatorToDisplay = this.value;
    populateOperator(operatorToDisplay);
    operate.a = +numberToDisplay;
    numberToDisplay = "";
    operate.arithmeticOperator = operatorToDisplay;
    populateNumbers(operate.a);
    operatorCounter = 1;
  }

  // B Store first number - operate.b
  if (operatorCounter === 1) {
    operatorToDisplay = this.value;
    populateOperator(operatorToDisplay);
    // operate.a = +numberToDisplay;
    // numberToDisplay = "";
    // operate.arithmeticOperator = operatorToDisplay;
    // populateNumbers(operate.a);
    operatorCounter = 1;
  }

  }
};
operatorButtons.forEach((button) => button.addEventListener("click", returnOperator));
