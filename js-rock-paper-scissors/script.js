"use strict";

let playerBoard = document.querySelector("#player-point");
let computerBoard = document.querySelector("#computer-point");
let playerBoardImg = document.querySelector("#player-choice img");
let compBoardImg = document.querySelector("#computer-choice img");
let roundFeedback = document.querySelector(".feedback");
let newGameBtn = document.querySelector("#new-game");
let playBtn = document.querySelectorAll(".play-btn");

newGameBtn.addEventListener("click", () => window.location.reload());
playBtn.forEach((btn) => btn.addEventListener("click", game));

function compHand() {
  let hand = Math.floor(Math.random() * 3);
  // Choose "weapon"
  switch (hand) {
    case 0:
      return "rock";
    case 1:
      return "paper";
    case 2:
      return "scissors";
  }
}

function playRound(pHand, cHand) {
  let pResult = 0;
  let cResult = 0;

  // Find the winner in RPS.
  if (pHand === cHand) {
    return ["DRAW", pResult, cResult];
  } else {
    if (pHand === "rock") {
      switch (cHand) {
        case "paper":
          cResult = 1;
          return ['Computer Wins! \n "Paper" beats "Rock"', pResult, cResult];
        case "scissors":
          pResult = 1;
          return ['You Win! \n "Rock" beats "Scissors"', pResult, cResult];
      }
    } else if (pHand === "paper") {
      switch (cHand) {
        case "rock":
          pResult = 1;
          return ['You Win! \n "Paper" beats "Rock"', pResult, cResult];
        case "scissors":
          cResult = 1;
          return ['Computer Wins! \n "Scissors" beats "Paper"', pResult, cResult];
      }
    } else if (pHand === "scissors") {
      switch (cHand) {
        case "paper":
          pResult = 1;
          return ['You Win! \n "Scissors" beats "Paper"', pResult, cResult];
        case "rock":
          cResult = 1;
          return ['Computer Wins! \n "Rock" beats "Scissors"', pResult, cResult];
      }
    }
  }
}

function updateScoreboard(pHand, cHand, rndResult) {
  let playerScore = parseInt(playerBoard.textContent);
  let compScore = parseInt(computerBoard.textContent);

  // Update the score board
  if (playerScore < 5 && compScore < 5) {
    playerBoard.textContent = playerScore += rndResult[1];
    computerBoard.textContent = compScore += rndResult[2];
    playerBoardImg.src = `images/svg/${pHand}.svg`;
    compBoardImg.src = `images/svg/${cHand}.svg`;
    roundFeedback.textContent = `${rndResult[0]}`;
  }
  // Check and update for GAME OVER
  if (playerScore === 5 || compScore === 5) {
    let endScore = document.querySelector(".game-over");
    endScore.classList.toggle("on");

    if (playerBoard.textContent === computerBoard.textContent) {
      endScore.textContent = "DRAW";
    } else if (playerBoard.textContent < computerBoard.textContent) {
      endScore.textContent = "COMPUTER WINS!";
    } else {
      endScore.textContent = "PLAYER WINS!";
    }
    playBtn.forEach((btn) => (btn.disabled = true));
  }

  roundFeedback.animate(
    [
      // keyframes
      { backgroundColor: "hsl(233, 23%, 40%)" },
      { backgroundColor: "hsl(235, 20%, 50%)" },
    ],
    {
      // timing options
      duration: 300,
      easing: "ease-in-out",
    }
  );
}

function game() {
  let playerHand = `${this.id}`;
  let computerHand = compHand();
  let roundResult = playRound(playerHand, computerHand);
  updateScoreboard(playerHand, computerHand, roundResult);
}
