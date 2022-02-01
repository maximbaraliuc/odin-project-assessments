function computerPlay() {
  let hand = Math.floor(Math.random() * 3);
  if (hand < 1) {
    return "Rock";
  } else if (hand == 1) {
    return "Paper";
  } else {
    return "Scissors";
  }
}

// PLayer interaction with 3 buttons.
// Function that listens to the buttons click and returns the content.
let checkButton = function (button) {
  button.addEventListener("click", () => {
    // console.log(`Player: ${button.textContent}`);
    // Plays the round function when a button push is registered and generates a random computer play
    return playRound(button.textContent, computerPlay());
  });
};
// Iterates through all selected buttons
let pushButton = document.querySelectorAll(".play-button");
let result = pushButton.forEach(checkButton);
// return playerSelection;

function playRound(playerSelection, computerSelection) {
  if (playerSelection === computerSelection) {
    return ["DRAW", playerSelection, computerSelection];
  } else if (playerSelection === "Rock") {
    if (computerSelection === "Scissors") {
      return console.log("You Won! Rock beats Scissors");
    } else {
      return console.log("You Lose! Paper beats Rock");
    }
  } else if (playerSelection === "Paper") {
    if (computerSelection === "Rock") {
      return console.log("You Won! Paper beats Rock");
    } else {
      return console.log("You Lose! Scissors beats Paper");
    }
  } else if (playerSelection === "Scissors") {
    if (computerSelection === "Paper") {
      return console.log("You Won! Paper beats Rock");
    } else {
      return console.log("You Lose! Scissors beats Paper");
    }
  } else {
    return console.log("Incorrect parameter!");
  }
}

console.log(result[0]);
console.log(result[1]);
console.log(result[2]);

// let result = playerPlay();
// console.log(`PLayer choice: ${result}`);
// console.log(`Computer choice: ${result}`);

// function game() {
//   for (let i = 0; i < 5; i++) {
//     console.log(i);
//     let playerSelection = prompt("Enter to game: ");
//     let computerSelection = computerPlay();
//     console.log(playRound(playerSelection, computerSelection));
//     // alert(playRound(playerSelection, computerSelection));
//   }
// }

// game();
