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

function playRound(playerSelection, computerSelection = "Rock") {
  playerSelection = playerSelection[0].toUpperCase() + playerSelection.slice(1).toLowerCase();
  if (playerSelection === computerSelection) {
    return "DRAW";
  } else if (playerSelection === "Rock") {
    if (computerSelection === "Scissors") {
      return "You Won! Rock beats Scissors";
    } else {
      return "You Lose! Paper beats Rock";
    }
  } else if (playerSelection === "Paper") {
    if (computerSelection === "Rock") {
      return "You Won! Paper beats Rock";
    } else {
      return "You Lose! Scissors beats Paper";
    }
  } else if (playerSelection === "Scissors") {
    if (computerSelection === "Paper") {
      return "You Won! Paper beats Rock";
    } else {
      return "You Lose! Scissors beats Paper";
    }
  } else {
    return "Incorrect parameter!";
  }
}

// console.log(playRound(playerSelection, computerSelection));

function game() {
  for (let i = 0; i < 5; i++) {
    console.log(i);
    let playerSelection = prompt("Enter to game: ");
    let computerSelection = computerPlay();
    console.log(playRound(playerSelection, computerSelection));
    // alert(playRound(playerSelection, computerSelection));
  }
}

game();
