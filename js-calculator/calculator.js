"use strict";

let numbersDisplay = document.querySelector(".number-display");
let operatorsDisplay = document.querySelector(".operator-display");

let numberButtons = document.querySelectorAll(".number");
let operatorButtons = document.querySelectorAll(".operator");
let equalButton = document.querySelector("#equal");
let allClearButton = document.querySelector("#all-clear");
let backspaceButton = document.querySelector("#backspace");
let decimalButton = document.querySelector("#decimal");

let numberInput = ""; // [-] TODO - check if it possible to reduce
let operatorInput = ""; // [-] TODO - check if it possible to reduce

// FUNCTIONS TO DISPLAY NUMBERS AND OPERATORS
let showNumbers = function (toDisplay) {
  numbersDisplay.textContent = toDisplay;
};
let showOperator = function (toDisplay) {
  operatorsDisplay.textContent = toDisplay;
};

// CALCULATOR'S OPERATE OBJECT WITH ARITHMETIC FUNCTIONS AND VARIABLES
// a and b values are transformed from "string" to "number" when being stored
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
    if (this.b === 0) {
      return "Cannot divide by zero";
    }
    return this.a / this.b;
  },
};

let returnNumber = function () {
  console.log("DISPLAY THE INPUT NUMBER. SECOND VALUE READY TO BE USED.");
  // Repair a bug when starting number is zero.
  if (numberInput === "0") {
    numberInput = "";
  }
  numberInput += this.value;
  showNumbers(numberInput); // Populates the display with each number button push.
  operate.b = Number(numberInput); // Store the input as the second number. Ready for math calculations
  // return this.value;
};

let returnOperator = function () {
  // When the operator is clicked as a first button. Nothing changes.
  // [-] TODO Wait for the implementation of "=" and other rules and check if it possible to omit this "if" condition
  if (numberInput === "" && operate.mathOperator === null) {
    console.log("STEP 01 NOTHING HAPPENS :)");
    return;

    // When the operator is clicked again immediately after a number or "equal's" result was just stored in memory. Leads to this condition
    // Selecting the operator multiple times in a row displays the new operator and does nothing else till it has numbers to work with.
  } else if (numberInput === "") {
    console.log("Step 02 OPERATOR CHANGED");
    // If there was an equal's calculation. Saves the value and resets it.
    if (operate.equal !== null) {
      operate.b = operate.equal;
      operate.equal = null;
    }
    // No number clicked.
    operatorInput = this.value;
    operate.mathOperator = operatorInput;
    showOperator(operatorInput);
    return;
  }

  // A. Store first number - the "a" number ==> operate.a. Runs one time if no reset
  if (operate.a === null) {
    console.log("STEP 03 FIRST TIME STORE THE OPERATOR.A VALUE");
    operate.a = Number(numberInput);
  }
  // B. Save a new "a" number  and do the calculation.
  // Code runs when a number is already stored and on the display is a new number present
  else if (operate.a !== null) {
    console.log("STEP 04 CALCULATE");
    operate.a = operate[operate.mathOperator]();
  }
  // This portion runs in any case after the above "if, else if" conditions.
  operatorInput = this.value;
  showOperator(operatorInput);
  numberInput = "";
  operate.mathOperator = operatorInput;
  showNumbers(operate.a);
  zeroError();
};

// AC BUTTON - RESET
let reset = function () {
  console.log("CALCULATOR RESET");
  operate.a = null;
  operate.b = null;
  operate.mathOperator = null;
  operate.equal = null;
  numberInput = "";
  showNumbers("||||");
  showOperator("...");
};

//  BACKSPACE BUTTON
let backspace = function () {
  console.log("BACKSPACE IN PLACE");
  let modifiedInput = numberInput.split("");
  // console.table(modifiedInput, "BEFORE");
  modifiedInput.pop();
  // console.table(modifiedInput, "AFTER");
  numberInput = modifiedInput.join("");
  if (numberInput === "") {
    // When deleting the last character.
    numberInput = "0";
  }
  showNumbers(numberInput);
  operate.b = Number(numberInput);
};

// EQUAL SIGN
let equals = function () {
  // Runs only when there are values and a math operator for an "equal" operation to take place
  if (operate.a !== null && operate.mathOperator !== null) {
    console.log("EQUAL SIGN ACTIVATED");
    numberInput = "";
    operate.a = operate[operate.mathOperator]();

    operate.equal = operate.a;
    showOperator(operatorInput);
    showNumbers(operate.a);
  } else {
    console.log("NOT ENOUGH DATA FOR AN OUTPUT");
  }
  zeroError();
};

// DIVISION BY ZERO ERROR
let zeroError = function () {
  if (operate.a === "Cannot divide by zero") {
    console.log("DIVISION BY ZERO DETECTED");
    reset();
    showNumbers("Cannot divide by zero");
    return;
  }
};

let addDecimal = function () {
  if (!numberInput.includes(".") && numberInput !== "") {
    console.log("ADD A DECIMAL POINT");
    numberInput += ".";
    showNumbers(numberInput);
  }
};

// ===========================================================================
numberButtons.forEach((button) => button.addEventListener("click", returnNumber));
operatorButtons.forEach((button) => button.addEventListener("click", returnOperator));
allClearButton.addEventListener("click", reset);
backspaceButton.addEventListener("click", backspace);
equalButton.addEventListener("click", equals);
decimalButton.addEventListener("click", addDecimal);

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

// [-] Displays number (as a string). Checks the length - RESOLVE LATER
// [-] TODO - bugs when zero is clicked first.
// [-] TODO it is possible to simplify the function, and to reduce numberInput?????
// [-] TODO check requirements for operation with zero. Mainly division.
// [-] TODO correct when the numbers starts with zero but has no decimal point.
// [-] TODO Refactoring. Variables names.
// [-] TODO Check if the relation (operate.mathOperator operatorInput) can be simplified.
// [-] TODO Number input should have limited number of characters. Also should be rounded.
// [+] TODO Check division by zero, create a function.

// PLAY WITH THE KEYBOARD
let keyPressed = function (e) {
  return console.log(`${e.code}`);
};
window.addEventListener("keydown", keyPressed);
