"use strict";
// Creating the container for the canvas
// let mainCanvas = document.getElementsByClassName("main-canvas")[0];
let mainCanvas = document.querySelector(".main-canvas");

// Variables for the canvas resolution
let numberOfCells = 6;

// Color change functions
// ======================
// Black color
let setColorBlack = function () {
  this.style.backgroundColor = "black";
};
// Grey-Black incremental
// Random color

let generateCanvas = function (nCells, setColor) {
  // Create a cell with corresponding "width" properties.
  let oneCell = document.createElement("div");
  oneCell.style.width = `${500 / nCells}px`;

  // Create all the cells in the container and  a variable for the node list.
  for (let i = 0; i < nCells * nCells; i++) {
    let copyCell = oneCell.cloneNode();
    mainCanvas.appendChild(copyCell);
  }
  let allCells = document.querySelectorAll(".main-canvas div");

  // Event listener for each element in the container to change background color .
  // Depends on an external function for setColor...
  for (let elem of allCells) {
    elem.addEventListener("mouseenter", setColor);
  }
};

generateCanvas(numberOfCells, setColorBlack);

// Reset the main canvas with a new number of cells.
let resetAndGenerate = function (nCells, setColor) {
  while (mainCanvas.firstChild) {
    mainCanvas.removeChild(mainCanvas.firstChild);
  }
  generateCanvas(nCells, setColor);
};

console.log(setColorBlack);
// console.log(setColorBlack());

// resetAndGenerate(4, setColorBlack);
