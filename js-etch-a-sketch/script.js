"use strict";

// ==========================================================================
// Input GRID SIZE

// Update the slider output
function outputUpdate(size) {
  // document.querySelector(".grid-size").value = size;
  document.querySelector(".grid-size").textContent = `${size} x ${size}`;
}
function sizeUpdate(value) {
  return document.querySelector(".slider-wrap input").value;
}
let slider = {
  size: sizeUpdate,
};
// Creating the container for the canvas
// let mainCanvas = document.getElementsByClassName("main-canvas")[0];
let mainCanvas = document.querySelector(".main-canvas");

// Variables for the canvas resolution
// slider.size();

// ==========================================================================
// Color change functions
// ==========================================================================
// ==========================================================================
// Color choice
// let choiceColor = choiceInput.value;
let setColorChoice = function (event) {
  event.target.style.backgroundColor = `${choiceInput.value}`;
  console.log("CHOICE APPLIED");
  // console.log(event.target);
};

// ==========================================================================
// Set black color for the pen
let setColorBlack = function (event) {
  event.target.style.backgroundColor = "rgb(0, 0, 0)";
  console.log("BLACK APPLIED");
  // console.log(event.target);
};

// ==========================================================================
// Set incremental darkening tones
// NOT SURE IF IT works only when the sta-tar color is rgb(250, 250, 250,)????
let setColorDarken = function (event) {
  let getColor = event.target.style.backgroundColor;
  // Get all RGB values as an array and change each value,decrement zero.
  // String, to an Array, map to numbers
  let rgb = getColor.slice(4, -1).split(", ").map(Number);
  let rgbFinalString = "rgb(";

  for (let rgbValue of rgb) {
    // console.log(rgbValue);
    // console.log(typeof rgbValue);
    if (rgbValue > 25) {
      rgbValue -= 25;
    } else {
      rgbValue = 0;
    }
    rgbFinalString += `${rgbValue},`;
  }
  rgbFinalString = rgbFinalString.slice(0, -1) + ")";
  event.target.style.backgroundColor = `${rgbFinalString}`;
  console.log("DARKEN APPLIED");
  // console.log(event.target);
};

// ==========================================================================
// Random color generator
let rgbGenerator = function () {
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
};

// ==========================================================================
// Set random color for the pen
let setColorRandom = function (event) {
  let rgb = rgbGenerator();
  event.target.style.backgroundColor = `${rgb}`;
  console.log("RANDOM APPLIED");
  // console.log(event.target);
  // // console.log(typeof this);
};

// ==========================================================================
// Create the pencil Object. The object property (will equal to a color choice
// function) is updated and applied in the event listener

let pen = {
  tipColor: setColorDarken,
};

// ==========================================================================
// USES GLOBAL SCOPE: pen.tipColor and gridCells
let usePencil = function () {
  // Event listener for each element in the container to change background color .
  // Depends on an external function for setColor...
  for (let elem of gridCells) {
    elem.addEventListener("mouseover", pen.tipColor);
    // elem.removeEventListener("mouseenter", penTip);
  }
};

// ==========================================================================
// Populate the drawing area with grid cells.
let generateCanvas = function (nCells) {
  // Create a cell with corresponding "width" and "bgColor" properties.
  let oneCell = document.createElement("div");
  oneCell.classList.add("grid-cell");
  oneCell.style.backgroundColor = "rgb(250, 250, 250)";

  // Create the respective columns and rows for the container
  mainCanvas.style.gridTemplateColumns = `repeat(${nCells}, 1fr)`;
  mainCanvas.style.griTemplateRows = `repeat(${nCells}, 1fr)`;

  // Create all the cells in the container and a variable for the node list.
  for (let i = 0; i < nCells * nCells; i++) {
    let copyCell = oneCell.cloneNode();
    mainCanvas.appendChild(copyCell);
  }
};

// ==========================================================================
// Reset the main canvas with a new number of cells.
let resetAndGenerate = function (nCells) {
  mainCanvas.style = ""; // Reset grid style
  while (mainCanvas.firstChild) {
    mainCanvas.removeChild(mainCanvas.firstChild);
  }
  generateCanvas(nCells);
};

// ==========================================================================
generateCanvas(slider.size());

// Code goes after the generateCanvas is run.
let gridCells = document.getElementsByClassName("grid-cell");
console.log(gridCells);

usePencil(); // USES GLOBAL: pen.tipColor and gridCells

// ==========================================================================
// ==========================================================================
// UI CONNECT WITH JAVASCRIPT
// ==========================================================================
// ==========================================================================

// ==========================================================================
// Input CHOOSE COLOR
let choiceInput = document.getElementById("choice");
choiceInput.addEventListener("input", function () {
  pen.tipColor = setColorChoice;
});

// ==========================================================================
// Button RANDOM COLOR
let randomButton = document.getElementById("random");
randomButton.addEventListener("click", function () {
  pen.tipColor = setColorRandom;
});

// ==========================================================================
// Button DARKEN
let darkenButton = document.getElementById("darken");
darkenButton.addEventListener("click", function () {
  pen.tipColor = setColorDarken;
});

// ==========================================================================
// Button BLACK
let blackButton = document.getElementById("black");
blackButton.addEventListener("click", function () {
  pen.tipColor = setColorBlack;
});

// ==========================================================================
// Generate new canvas

let generateButton = document.getElementById("generate");
generateButton.addEventListener("click", function () {
  resetAndGenerate(slider.size());
  usePencil();
});

// ==========================================================================
// Button RESET
let resetButton = document.getElementById("reset");
resetButton.addEventListener("click", function () {
  resetAndGenerate(16);
  pen.tipColor = setColorBlack;
  usePencil();
});

console.log(reset);
