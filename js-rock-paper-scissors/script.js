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

function onePLay(playerSelection, computerSelection = "Rock") {
  playerSelection = playerSelection[0].toUpperCase() + playerSelection.slice(1).toLowerCase();
  // alert("Your string: " + playerSelection);
  if (playerSelection === computerSelection) {
    alert("DRAW");
    return "DRAW";
  } else if (playerSelection === "Rock") {
    if (computerSelection === "Scissors") {
      // console.log("You Won! Rock beats Scissors");
      return "You Won! Rock beats Scissors";
    } else {
      // console.log("You Lose! Paper beats Rock");
      return "You Lose! Paper beats Rock";
    }
  } else if (playerSelection === "Paper") {
    if (computerSelection === "Rock") {
      // console.log("You Won! Paper beats Rock");
      return "You Won! Paper beats Rock";
    } else {
      // console.log("You Lose! Scissors beats Paper");
      return "You Lose! Scissors beats Paper";
    }
  } else {
    if (computerSelection === "Paper") {
      // console.log("You Won! Paper beats Rock");
      return "You Won! Paper beats Rock";
    } else {
      // console.log("You Lose! Scissors beats Paper");
      return "You Lose! Scissors beats Paper";
    }
  }
}

let playerSelection = prompt("Enter to game: ");
let computerSelection = computerPlay();

onePLay(playerSelection, computerSelection);
