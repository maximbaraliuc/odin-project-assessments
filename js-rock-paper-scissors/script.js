function cPlay() {
  let hand = Math.floor(Math.random() * 3);
  if (hand < 1) {
    return "Rock";
  } else if (hand == 1) {
    return "Paper";
  } else {
    return "Scissors";
  }
}

function playRound(playerSelection, computerSelection) {
  let roundWon = 0;
  let roundLost = 0;
  if (playerSelection === computerSelection) {
    roundWon = 1;
    roundLost = 1;
    return ["DRAW", roundWon, roundLost];
  } else if (playerSelection === "Rock") {
    if (computerSelection === "Scissors") {
      roundWon = 1;
      return ["You Won! Rock beats Scissors", roundWon, roundLost];
    } else {
      roundLost = 1;
      return ["You Lose! Paper beats Rock", roundWon, roundLost];
    }
  } else if (playerSelection === "Paper") {
    if (computerSelection === "Rock") {
      roundWon = 1;
      return ["You Won! Paper beats Rock", roundWon, roundLost];
    } else {
      roundLost = 1;
      return ["You Lose! Scissors beats Paper", roundWon, roundLost];
    }
  } else if (playerSelection === "Scissors") {
    if (computerSelection === "Paper") {
      roundWon = 1;

      return ["You Won! Paper beats Rock", roundWon, roundLost];
    } else {
      roundLost = 1;
      return ["You Lose! Scissors beats Paper", roundWon, roundLost];
    }
  } else {
    return ["Incorrect parameter!", roundWon, roundLost];
  }
}

function game() {
  if (playCount <= 5) {
    playerScore.textContent = parseInt(playerScore.textContent) + resultRound[1];
    computerScore.textContent = parseInt(computerScore.textContent) + resultRound[2];
    playerChoice.textContent = playerPlay;
    computerChoice.textContent = computerPlay;
    feedback.textContent = `${resultRound[0]}`;
    // alert(`${resultRound[0]} | Round ${playCount} is finished.`);
  } else if (playCount > 6) {
    return;
  } else {
    currentState.appendChild(document.createElement("span"));
    let endScore = document.querySelector(".current-state span:last-child");
    if (playerScore.textContent === computerScore.textContent) {
      endScore.textContent = "DRAW";
    } else if (playerScore.textContent > computerScore.textContent) {
      endScore.textContent = "LOSER";
    } else {
      endScore.textContent = "WINNER";
    }

    alert("Game is finished. Start a new game.");
  }
}

// INITIALIZATION

let playerPlay;
let computerPlay;
let resultRound;
let playCount = 0;

let playerScore = document.querySelector("#player-point");
let computerScore = document.querySelector("#computer-point");

let playerChoice = document.querySelector("#player-choice");
let computerChoice = document.querySelector("#computer-choice");

let feedback = document.querySelector(".feedback");
let currentState = document.querySelector(".current-state");

// Get the value from pressed button. Save it to playerPlay variable.
// Play one round

let playedButtons = document.querySelectorAll(".play-button");

playedButtons.forEach((button) => {
  button.addEventListener("click", function (e) {
    // console.log(e);
    // console.log(e.target.firstChild.data);
    playerPlay = `${e.target.firstChild.data}`;
    playCount++;
    console.log(playCount);
    computerPlay = cPlay();
    resultRound = playRound(playerPlay, computerPlay);
    game();
  });
});

// NEW GAME

let newGameButton = document.querySelector("#new-game");
newGameButton.addEventListener("click", reloadWindow);
function reloadWindow() {
  return window.location.reload();
}
