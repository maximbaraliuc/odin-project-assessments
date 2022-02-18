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
  mathOperator: null,
  equal: null,

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
// TODO Check if the relation (operate.mathOperator operatorInput) can be simplified.
// TODO Number input should have limited number of characters. Also should be rounded.
//  TODO Check division by Zero, create a function

let returnValue = function () {
  console.log("DISPLAY THE INPUT NUMBER. SECOND VALUE READY TO BE USED.");
  numberInput += this.value;
  populateNumbers(numberInput); // Populates the display with each number button push.
  operate.b = Number(numberInput); // Store the input as the second number. Ready for math calculations
  // return this.value;
};

let returnOperator = function () {
  // When the operator is clicked as a first button. Nothing changes.
  // TODO Wait for the implementation of "=" and other rules and check if it possible to omit this "if" condition||||||
  if (numberInput === "" && operate.mathOperator === null) {
    console.log("Step 01 NOTHING HAPPENS :)");
    // operatorInput = this.value;
    // populateOperator(operatorInput);
    return;

    // When the operator is clicked again immediately after a number or equal was just stored in memory. Leads to this condition
    // Selecting the operator multiple times in a row displays the new operator and does nothing else till it has numbers to work with
  } else if (numberInput === "") {
    console.log("Step 02 OPERATOR CHANGED");
    // If there was an equals calculation. Save the value and reset it
    if (operate.equal !== null) {
      operate.b = operate.equal;
    }
    operate.equal = null;
    // No number clicked.
    operatorInput = this.value;
    operate.mathOperator = operatorInput;
    populateOperator(operatorInput);
    return;
  }

  // A. Store first number - the "a" number ==> operate.a. Runs one time if no reset
  if (operate.a === null) {
    console.log("Step 03 FIRST TIME STORE THE OPERATOR.A VALUE");
    operate.a = Number(numberInput);
  }
  // B. Save a new "a" number  and calculates
  // Code runs when a number is already stored and on display is a new number
  else if (operate.a !== null) {
    console.log("Step 04 CALCULATE");
    operate.a = operate[operate.mathOperator]();
  }
  operatorInput = this.value;
  populateOperator(operatorInput);
  numberInput = "";
  operate.mathOperator = operatorInput;
  populateNumbers(operate.a);
};

let reset = function () {
  console.log("CALCULATOR RESET");
  operate.a = null;
  operate.b = null;
  operate.mathOperator = null;
  operate.equal = null;
  numberInput = "";
  populateNumbers("|");
  populateOperator(".");
};

let backspace = function () {
  // if (numberInput === "") {
  //   populateNumbers("|");
  // }
  console.log("BACKSPACE IN PLACE");
  let modifiedInput = numberInput.split("");
  console.table(modifiedInput, "BEFORE");
  modifiedInput.pop();
  console.table(modifiedInput, "AFTER");
  numberInput = modifiedInput.join("");

  if (numberInput === "") {
    populateNumbers("|");
  } else {
    populateNumbers(numberInput);
  }
  operate.b = Number(numberInput);
};

let equals = function () {
  // Runs only when there are values and a math operator for an "equal" operation to take place
  if (operate.a !== null && operate.mathOperator !== null) {
    console.log("RUN EQUALS");
    numberInput = "";
    operate.a = operate[operate.mathOperator]();
    operate.equal = operate.a;
    populateOperator(operatorInput);
    populateNumbers(operate.a);
  } else {
    console.log("NOT ENOUGH DATA FOR AN OUTPUT");
  }
};

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
