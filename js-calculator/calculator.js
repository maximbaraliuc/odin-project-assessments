"use strict";

let numbersDisplay = document.querySelector(".number-display");
let operatorsDisplay = document.querySelector(".operator-display");

let numberButtons = document.querySelectorAll(".number");
let operatorButtons = document.querySelectorAll(".operator");
let equalButton = document.querySelector("#equal");
let allClearButton = document.querySelector("#all-clear");
let backspaceButton = document.querySelector("#backspace");

let numberInput = ""; // TODO - check if it possible to reduce
let operatorInput = ""; // TODO - check if it possible to reduce

// FUNCTIONS TO DISPLAY NUMBERS AND OPERATORS
let populateNumbers = function (toDisplay) {
  numbersDisplay.textContent = toDisplay;
};

let populateOperator = function (toDisplay) {
  operatorsDisplay.textContent = toDisplay;
};

// CALCULATOR'S OPERATE OBJECT WITH ARITHMETIC FUNCTIONS AND VARIABLES
// a and b values are transformed from "string" to "number" when stored

let operate = {
  a: null,
  b: null,
  arithmeticOperator: null,

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

// Displays number (as a string). Checks the length - RESOLVE LATER !!!!!!!!!!!!!!!1111
// TODO - bugs when zero is clicked first||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
// TODO it is possible to simplify the function, and to reduce numberInput?????||||||||||||||||||||||||||||||||||||
// TODO check requirements for operation with zero. Mainly division||||||||||||||||||||||||||||||||||||||||||||||||||||
// TODO correct when the numbers starts with zero but has no decimal point||||||||||||||||||||||||||||||||||||||||||
// TODO Refactoring. Variables names

let returnValue = function () {
  numberInput += this.value;
  populateNumbers(numberInput); // Populates the display with each number button push.
  // return this.value;
};

let returnOperator = function () {
  // When the operator is clicked as a first button. Nothing changes but the display.
  // TODO Wait for the implementation of "=" and other rules and check if it possible to omit this "if" condition||||||
  if (numberInput === "" && operate.arithmeticOperator === null) {
    operatorInput = this.value;
    populateOperator(operatorInput);
    return;

    // When the operator is clicked again immediately after a number was just stored in memory. Leads to this condition
    // Selecting the operator multiple times in a row displays the new operator and does nothing else till it has numbers to work with
  } else if (numberInput === "") {
    // No number clicked.
    operatorInput = this.value;
    operate.arithmeticOperator = operatorInput;
    populateOperator(operatorInput);
    return;
  }

  // A. Store first number - the "a" number ==> operate.a. Runs one time if no reset
  if (operate.a === null) {
    operate.a = Number(numberInput);
  }
  // B. Save a new "a" number and save a "b" number and calculate
  // Code runs when a number is already stored and on display is a new number
  else if (operate.a !== null) {
    operate.b = Number(numberInput);
    // RUN THE CALCULATIONS
    operate.a = operate[operate.arithmeticOperator]();
  }
  operatorInput = this.value;
  populateOperator(operatorInput);
  numberInput = "";
  operate.arithmeticOperator = operatorInput;
  populateNumbers(operate.a);
};

let reset = function () {};
let backspace = function () {};
let equals = function () {};

// ===========================================================================
numberButtons.forEach((button) => button.addEventListener("click", returnValue));
operatorButtons.forEach((button) => button.addEventListener("click", returnOperator));
allClearButton.addEventListener("click", reset);
backspaceButton.addEventListener("click", backspace);
equalButton.addEventListener("click", equals);

// ===========================================================================

// SOUND FEEDBACK
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
