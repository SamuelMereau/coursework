/* Written by Samuel Mereau, 2020 */

let output;

let playerSelection;
let computerSelection;

let winCounter = 0;
let loseCounter = 0;
let gameCount = 0;

let hasPlayed;
let finishedPlay;

//winCount should be returned for every round resulting in a win for the player
function winCount() {
  winCounter++;
  gameCount++;
  const result = document.querySelector("#results");
  const addResult = document.createElement("p");
  addResult.textContent = `You Win! You've won ${winCounter} game/s so far. ${gameCount} game/s have been played so far.`;
  result.appendChild(addResult);
}
//loseCount should be returned for every round resulting in a loss for the player
function loseCount() {
  loseCounter++;
  gameCount++;
  const result = document.querySelector("#results");
  const addResult = document.createElement("p");
  addResult.textContent = `You Lose! You've lost ${loseCounter} game/s so far. ${gameCount} game/s have been played so far.`;
  result.appendChild(addResult);
}
//draw should be returned for every round resulting in equal action played
function draw() {
  gameCount++;
  const result = document.querySelector("#results");
  const addResult = document.createElement("p");
  addResult.textContent = `Draw! No points were gained or lost. ${gameCount} game/s have been played so far.`;
  result.appendChild(addResult);
}

//computerPlay will create a random selection for all plays each time it is called
let computerPlay = () => {
  let random = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
  switch (random) {
    case 1:
      output = "ROCK";
      break;
    case 2:
      output = "PAPER";
      break;
    case 3:
      output = "SCISSORS";
      break;
  }
};

//playRound is nested within game(), and is looped 5 times to complete the entire game
function playRound() {
  computerPlay();
  computerSelection = output;

  if (hasPlayed === true) {
    if (
      (playerSelection.toUpperCase() == "ROCK" &&
        computerSelection == "PAPER") ||
      (playerSelection.toUpperCase() == "PAPER" &&
        computerSelection == "SCISSORS") ||
      (playerSelection.toUpperCase() == "SCISSORS" &&
        computerSelection == "ROCK")
    ) {
      return loseCount();
    } else if (
      (playerSelection.toUpperCase() == "ROCK" &&
        computerSelection == "SCISSORS") ||
      (playerSelection.toUpperCase() == "PAPER" &&
        computerSelection == "ROCK") ||
      (playerSelection.toUpperCase() == "SCISSORS" &&
        computerSelection == "PAPER")
    ) {
      return winCount();
    } else if (playerSelection.toUpperCase() == computerSelection) {
      return draw();
    } else {
      return "It doesn't look like your play was valid. Try again";
    }
  } else {
    return;
  }
}

function finishRoundLogic() {
  const result = document.querySelector("#results");
  const notice = document.querySelector("#notice");
  //Remove the first notice sent as a reult of pressing the Start Game button
  if (notice !== null) {
    notice.remove();
  }
  //Stop the game once the gameCount reaches 5
  if (gameCount == 5 && winCounter > loseCounter) {
    const finishGame = document.createElement("p");
    finishGame.textContent = `Game finished! You won the game with a total of ${winCounter} win/s and ${loseCounter} losses. Please refresh the page to start a new game.`;
    result.appendChild(finishGame);
    finishedPlay = true;
    return resetGame();
  } else if (gameCount == 5 && loseCounter > winCounter) {
    const finishGame = document.createElement("p");
    finishGame.textContent = `Game finished! You lost the game with a total of ${loseCounter} losses and ${winCounter} win/s. Please refresh the page to start a new game.`;
    result.appendChild(finishGame);
    finishedPlay = true;
    return resetGame();
  } else if (gameCount == 5 && loseCounter == winCounter) {
    const finishGame = document.createElement("p");
    finishGame.textContent = `Game finished with a draw! Please refresh the page to start a new game.`;
    result.appendChild(finishGame);
    finishedPlay = true;
    return resetGame();
  }
}

function awaitPlay() {
  //Listen for an event response from buttons
  const rockButton = document.querySelector("#rock");
  rockButton.addEventListener("click", function rockEvent(e) {
    if (finishedPlay === true) {
      return;
    }
    finishRoundLogic();
    playerSelection = "ROCK";
    hasPlayed = true;
    playRound();
  });
  const paperButton = document.querySelector("#paper");
  paperButton.addEventListener("click", function paperEvent(e) {
    console.log("Paper Event Listener Added");
    if (finishedPlay === true) {
      return;
    }
    finishRoundLogic();
    playerSelection = "PAPER";
    hasPlayed = true;
    playRound();
  });
  const scissorsButton = document.querySelector("#scissors");
  scissorsButton.addEventListener("click", function scissorEvent(e) {
    console.log("Scissor Event Listener Added");
    if (finishedPlay === true) {
      return;
    }
    finishRoundLogic();
    playerSelection = "SCISSORS";
    hasPlayed = true;
    playRound();
  });
}

function startGame() {
  const startBtn = document.querySelector("#startGame");
  startBtn.addEventListener("click", startGameLogic);
  eventListenerAdded = true;
}

function startGameLogic() {
  const result = document.querySelector("#results");
  const notice = document.createElement("p");
  const startButton = document.querySelector("#startGame");
  notice.setAttribute("id", "notice");
  notice.textContent = `Pick an option to begin play`;
  result.style.backgroundColor = "pink";
  result.appendChild(notice);
  startButton.disabled = true;
  //Start game button is disabled once game begins
  resetStart();
  //Begin Game
  finishedPlay = false;
  awaitPlay();
}

function resetStart() {
  //Prevents duplication of click event handlers
  const startBtn = document.querySelector("#startGame");
  startBtn.removeEventListener("click", startGameLogic);
}

function resetGame() {
  //Prevents duplication of click event handlers
  const rockButton = document.querySelector("#rock");
  rockButton.removeEventListener("click", function rockEvent(e) {
    if (finishedPlay === true) {
      return;
    }
    finishRoundLogic();
    playerSelection = "ROCK";
    hasPlayed = true;
    playRound();
  });
  const paperButton = document.querySelector("#paper");
  paperButton.removeEventListener("click", function paperEvent(e) {
    if (finishedPlay === true) {
      return;
    }
    finishRoundLogic();
    playerSelection = "PAPER";
    hasPlayed = true;
    playRound();
  });
  const scissorsButton = document.querySelector("#scissors");
  scissorsButton.removeEventListener("click", function scissorEvent(e) {
    if (finishedPlay === true) {
      return;
    }
    finishRoundLogic();
    playerSelection = "SCISSORS";
    hasPlayed = true;
    playRound();
  });
}

startGame();
