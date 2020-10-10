/* Written by Samuel Mereau, 2020 */

//Global Variables
let output;

let winCounter = 0;
let loseCounter = 0;

console.log(
  "\n      %cEnter game() to begin!\n\t\t".trim(),
  "\n      color: white;\n      background-color: black;\n      font-size: 1.4rem;\n      padding: 20px;\n"
);

//winCount should be returned for every round resulting in a win for the player
let winCount = () => {
  winCounter++;
  console.log(`You Won! You've won ${winCounter} game/s so far`);
};
//loseCount should be returned for every round resulting in a loss for the player
let loseCount = () => {
  loseCounter++;
  console.log(`You Lost! You've lost ${loseCounter} game/s so far`);
};
//draw should be returned for every round resulting in equal action played
let draw = () => {
  console.log("Draw! No points gained or losed");
};
//computerPlay will create a random selection from all plays each time it is called
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
//playRound is nested within game(), and is looped 5 times to complete the entire game. UX friendly
function playRound(playerSelection, computerSelection) {
  computerPlay();
  computerSelection = output;
  playerSelection = prompt("Rock, paper or scissors?");
  console.log(
    `You played ${playerSelection.toUpperCase()}, the computer played ${output}.`
  );

  if (
    (playerSelection.toUpperCase() == "ROCK" && computerSelection == "PAPER") ||
    (playerSelection.toUpperCase() == "PAPER" &&
      computerSelection == "SCISSORS") ||
    (playerSelection.toUpperCase() == "SCISSORS" && computerSelection == "ROCK")
  ) {
    return loseCount();
  } else if (
    (playerSelection.toUpperCase() == "ROCK" &&
      computerSelection == "SCISSORS") ||
    (playerSelection.toUpperCase() == "PAPER" && computerSelection == "ROCK") ||
    (playerSelection.toUpperCase() == "SCISSORS" &&
      computerSelection == "PAPER")
  ) {
    return winCount();
  } else if (playerSelection.toUpperCase() == computerSelection) {
    return draw();
  } else {
    return "It doesn't look like your play was valid. Try again";
  }
}
//Main function. UX friendly
function game() {
  for (playCount = 0; playCount < 5; playCount++) {
    playRound();
    //Stop the game if the player presses Cancel
    if (playerSelection === null) {
      break;
    }
    //Stop the game once 5 rounds are played
    if (playCount == 5) {
      break;
    }
  }
  if (winCounter > loseCounter) {
    return `You Won! Final score was: ${winCounter} | ${loseCounter}`;
  } else if (loseCounter > winCounter) {
    return `You Lost! Final score was: ${winCounter} | ${loseCounter}`;
  } else {
    return `Draw Game!`;
  }
}
