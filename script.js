let output;

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

function playRound(playerSelection, computerSelection) {
  computerPlay();

  playerSelection = prompt("Rock, paper or scissors?");
  if (playerSelection === null) {
    return;
  }
  computerSelection = output;

  console.log(
    `You played ${playerSelection.toUpperCase()}, the computer played ${output}.`
  );

  if (
    (playerSelection.toUpperCase() == "ROCK" && computerSelection == "PAPER") ||
    (playerSelection.toUpperCase() == "PAPER" &&
      computerSelection == "SCISSORS") ||
    (playerSelection.toUpperCase() == "SCISSORS" && computerSelection == "ROCK")
  ) {
    console.log("You Won!");
  } else if (
    (playerSelection.toUpperCase() == "ROCK" &&
      computerSelection == "SCISSORS") ||
    (playerSelection.toUpperCase() == "PAPER" && computerSelection == "ROCK") ||
    (playerSelection.toUpperCase() == "SCISSORS" &&
      computerSelection == "PAPER")
  ) {
    console.log("You won!");
  } else if (playerSelection.toUpperCase() == computerSelection) {
    console.log("Draw!");
  } else {
    console.log("It doesn't look like your play was valid. Try again");
  }
}

function game() {
  for (count = 0; count < 5; count++) {
    playRound();
  }
}
