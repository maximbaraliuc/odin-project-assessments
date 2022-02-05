// "use strict";
// Creating the container for the canvas
// let mainCanvas = document.getElementsByClassName("main-canvas")[0];
let mainCanvas = document.querySelector(".main-canvas");

// Variables for the canvas resolution
let numberOfCells = 10;

// ==========================================================================
// Color change functions
// ==========================================================================

// ==========================================================================
// Set black color pencil
let setColorBlack = function (e) {
  this.style.backgroundColor = "rgb(0, 0, 0)";
  console.log("BLACK APPLIED");
};

// ==========================================================================
// Set incremental darkening tones
// NOT SURE IF IT works only when the sta-tar color is rgb(250, 250, 250,)????
let setColorDarken = function () {
  let getColor = this.style.backgroundColor;
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
  this.style.backgroundColor = `${rgbFinalString}`;
  // console.log(this.style.backgroundColor);
  console.log("DARKEN APPLIED");
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
// Set random color pencil
let setColorRandom = function () {
  let rgb = rgbGenerator();
  this.style.backgroundColor = `${rgb}`;
  console.log("RANDOM APPLIED");
};

// ==========================================================================
let pencil = function (setColorX, allCells) {
  // Event listener for each element in the container to change background color .
  // Depends on an external function for setColor...
  for (let elem of allCells) {
    elem.addEventListener("mouseenter", setColorX);
  }
  // for (let elem of allCells) {
  //   elem.addEventListener("mouseleave", (e) => {
  //     console.log(this);
  //     console.log(e);
  //   });

  // for (let elem of allCells) {
  //   elem.addEventListener("mouseleave", function () {
  //     elem.removeEventListener("mouseenter", setColorX, false);
  //   });
  /* e.removeEventListener("mouseenter", (e) => console.log("EVENT REMOVED")) */
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
  let allCells = document.querySelectorAll(".main-canvas div");
  return allCells;
};

// ==========================================================================
// Reset the main canvas with a new number of cells.
let resetAndGenerate = function (nCells) {
  while (mainCanvas.firstChild) {
    mainCanvas.removeChild(mainCanvas.firstChild);
  }
  generateCanvas(nCells);
};

// ==========================================================================
generateCanvas(numberOfCells);

// Code goes after the generateCanvas is run.
let gridCells = document.getElementsByClassName("grid-cell");
console.log(gridCells);

// pencil(setColorDarken, gridCells);
pencil(setColorBlack, gridCells);
// pencil(setColorRandom, gridCells);

// ==========================================================================
// ==========================================================================
// UI CONNECT WITH JAVASCRIPT
// ==========================================================================
// ==========================================================================

// Update the slider output
function outputUpdate(size) {
  // document.querySelector(".grid-size").value = size;
  document.querySelector(".grid-size").textContent = `${size} x ${size}`;
}

// ==========================================================================
// Input PICK COLOR

// ==========================================================================
// Button RANDOM COLOR

// ==========================================================================
// Button DARKEN

// ==========================================================================
// Button BLACK

// ==========================================================================
// Input GRID SIZE

// ==========================================================================
// Button RESET
