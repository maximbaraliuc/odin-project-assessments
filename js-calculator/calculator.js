// CALCULATOR FUNCTIONS

const add = function (a, b) {
  return a + b;
};

const subtract = function (a, b) {
  return a - b;
};

const multiply = function (a, b) {
  return a * b;
};

const divide = function (a, b) {
  return a / b;
};

// ======================

// Buttons value (equals to operator) should be the same string as functions names above.
const operate = function (operator, a, b) {
  return operator(a, b);
};

// Check the value and names on click TEMPORARY CODE =========================
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
); // ========================================================================
