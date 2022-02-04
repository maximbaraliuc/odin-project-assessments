"use strict";
// Creating the container for the canvas
// let mainCanvas = document.getElementsByClassName("main-canvas")[0];
let mainCanvas = document.querySelector(".main-canvas");

// Variables for the canvas resolution
let numberOfCells = 4;

// Color change functions
// ======================
// Black color
let setColorBlack = function () {
  this.style.backgroundColor = "black";
};

// Grey-Black incremental tones
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
  console.log(this.style.backgroundColor);
};

// Random color
let setColorRandom = function () {
  let randomColor = Math.floor(Math.random() * 16777215).toString(16);
  this.style.backgroundColor = `#${randomColor}`;
};

let colorize = function (setColorX, allCells) {
  // Event listener for each element in the container to change background color .
  // Depends on an external function for setColor...
  for (let elem of allCells) {
    elem.addEventListener("mouseenter", setColorX);
  }
};

let generateCanvas = function (nCells, setColorX) {
  // Create a cell with corresponding "width" and "bgColor" properties.
  let oneCell = document.createElement("div");
  oneCell.style.backgroundColor = "rgb(250, 250, 250)";
  oneCell.style.width = `${500 / nCells}px`;

  // Create all the cells in the container and  a variable for the node list.
  for (let i = 0; i < nCells * nCells; i++) {
    let copyCell = oneCell.cloneNode();
    mainCanvas.appendChild(copyCell);
  }
  let allCells = document.querySelectorAll(".main-canvas div");

  colorize(setColorX, allCells);
};

generateCanvas(numberOfCells, setColorDarken);

// Reset the main canvas with a new number of cells.
let resetAndGenerate = function (nCells, setColor) {
  while (mainCanvas.firstChild) {
    mainCanvas.removeChild(mainCanvas.firstChild);
  }
  generateCanvas(nCells, setColor);
};

// console.log(setColorBlack);
// console.log(setColorBlack());

// resetAndGenerate(4, setColorBlack);
// console.log();
