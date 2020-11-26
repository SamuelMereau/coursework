function add(...num) {
  //Adds (at least) two
  if (num.length < 2) {
    return 'ERROR, Less than two numbers';
  }
  return num.reduce((a, b) => a + b, 0);
}

function subtract(...num) {
  //Subtracts (at least) two numbers
  if (num.length < 2) {
    return 'ERROR, Less than two numbers';
  }
  return num.reduce((a, b) => a - b, 0);
}

function multiply(...num) {
  //Multiplies (at least) two numbers
  if (num.length < 2) {
    return 'ERROR, Less than two numbers';
  }
  return num.reduce((a, b) => a * b, 0);
}

function divide(...num) {
  //Divides (at least) two numbers
  if (num.length < 2) {
    return 'ERROR, Less than two numbers';
  }
  return num.reduce((a, b) => a / b, 0);
}

function operate(...operation) {
  //Takes an operator (+, -, *, /) and two numbers and then calls one of the above functions on the numbers
}
