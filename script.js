function add(num) {
  //Adds two numbers
  //convert string integers to numbers
  for (let i = 0; i < num.length; i++) {
    if (typeof num[i] == 'string') {
      num[i] = parseInt(num[i]);
    }
  }
  console.log('ADD FUNCTION: num: ' + num);
  return num.reduce((a, b) => a + b, 0);
}

function subtract(num) {
  //Subtracts two numbers
  for (let i = 0; i < num.length; i++) {
    if (typeof num[i] == 'string') {
      num[i] = parseInt(num[i]);
    }
  }
  console.log('SUBTRACT FUNCTION: num: ' + num);
  return num.reduce((a, b) => a - b, 0);
}

function multiply(num) {
  //Multiplies two numbers
  console.log('multiply num: ' + num);
  for (let i = 0; i < num.length; i++) {
    num[i] = parseInt(num[i]);
  }
  console.log('multiply FUNCTION: num: ' + num);
  console.log('num[0] ' + num[0]);
  return num.reduce((a, b) => a * b);
}

function divide(num) {
  //Divides two numbers
  console.log('num: ' + num);
  for (let i = 0; i < num.length; i++) {
    if (typeof num[i] == 'string') {
      num[i] = parseInt(num[i]);
    }
  }
  console.log('DIVIDE FUNCTION: num: ' + num);
  console.log('num[0] ' + num[0]);
  return num.reduce((a, b) => a / b);
}

function operate([...operation]) {
  //Takes an operator (+, -, *, /) and two numbers and then calls one of the above functions on the numbers
  let output = 0;
  operation = operation.join();
  console.log(operation);
  operation = operation.replace(/,/g, '');
  console.log(operation);

  //is operation a correct mathematical equation?
  //(e.g '1+1' returns true, '1+' returns false)
  const regex = /(?:(?:^|[-+_*/])(?:\s*-?\d+(\.\d+)?(?:[eE][+-]?\d+)?\s*))+$/;
  function test(equation) {
    return regex.test(equation);
  }
  if (test(operation) == false) {
    console.log('returned false');
    return;
  }

  //parse operation
  let newOperation = operation;
  for (let i = 0; i < newOperation.length; i++) {
    console.warn('i = ' + i);
    if (operation[i] == '+') {
      console.log('returned true. operation[i]: ' + operation[i]);
      console.log('operation[i]: ' + operation[i]);
      console.log(
        'ADD newOperation[i-1] + [i] + [i+1]: ' +
          newOperation[i - 1] +
          newOperation[i] +
          newOperation[i + 1]
      );
      console.log('operation: ' + operation);
      console.log('newOperation: ' + newOperation);
      newOperation = newOperation.replace(operation[i], `,"${operation[i]}",`);
    }
    if (operation[i] == '-') {
      console.log('returned true. operation[i]: ' + operation[i]);
      console.log('operation: ' + operation);
      console.log('newOperation: ' + newOperation);
      console.log('newOperation[i+1]: ' + newOperation[i + 1]);
      console.log(
        'SUB newOperation[i-1] + [i] + [i+1]: ' +
          newOperation[i - 1] +
          newOperation[i] +
          newOperation[i + 1]
      );
      newOperation = newOperation.replace(operation[i], `,"${operation[i]}",`);
    }
    if (operation[i] == '*') {
      console.log('returned true. operation[i]: ' + operation[i]);
      console.log('operation: ' + operation);
      console.log('newOperation: ' + newOperation);
      newOperation = newOperation.replace(operation[i], `,"${operation[i]}",`);
    }
    if (operation[i] == '/') {
      console.log('returned true. operation[i]: ' + operation[i]);
      console.log('operation: ' + operation);
      console.log('newOperation: ' + newOperation);
      newOperation = newOperation.replace(operation[i], `,"${operation[i]}",`);
      continue;
    }
  }
  newOperation = `[` + newOperation;
  newOperation = newOperation += `]`;
  newOperation = JSON.parse(newOperation);
  console.log('split: ' + newOperation);

  //evaluate equation
  let divideEquation = [];
  let multiplyEquation = [];
  let additionEquation = [];
  let subtractEquation = [];
  //break the equation into parts, completing sections of the equation in BIDMAS order
  for (let i = 0; i < newOperation.length; i++) {
    if (newOperation.includes('/') == true) {
      //a division operation is found in the equation
      let occurences = (`${newOperation.toString()}`.match(/[\/]/g) || []).length;
      if (occurences == 1) {
        divideEquation += `["${newOperation[newOperation.indexOf('/') - 1]}","${
          newOperation[newOperation.indexOf('/') + 1]
        }"]`;
        divideEquation = JSON.parse(divideEquation);
        let indexOfDivision = newOperation.indexOf('/');
        newOperation.splice(indexOfDivision - 1, 3);
        newOperation[indexOfDivision - 1] = divide(divideEquation);
        break;
      } else {
        for (let i = 0; i < occurences; i++) {
          if (newOperation.indexOf('/', i + 1) == occurences) {
            break;
          }
          divideEquation += `["${newOperation[newOperation.indexOf('/') - 1]}","${
            newOperation[newOperation.indexOf('/') + 1]
          }"]`;
        }
        divideEquation = JSON.parse(divideEquation);
      }
    }
  }
  for (let i = 0; i < newOperation.length; i++) {
    if (newOperation.includes('*') == true) {
      //a multiplication operation is found in the equation
      let occurences = (`${newOperation.toString()}`.match(/[*]/) || []).length;
      if (occurences == 1) {
        multiplyEquation += `["${newOperation[newOperation.indexOf('*') - 1]}","${
          newOperation[newOperation.indexOf('*') + 1]
        }"]`;
        multiplyEquation = JSON.parse(multiplyEquation);
        break;
      } else {
        for (let i = 0; i < occurences; i++) {
          if (newOperation.indexOf('*', i + 1) == occurences) {
            break;
          }
          multiplyEquation += `["${newOperation[newOperation.indexOf('*') - 1]}","${
            newOperation[newOperation.indexOf('*') + 1]
          }"]`;
        }
        multiplyEquation = JSON.parse(multiplyEquation);
      }
    }
  }
  for (let i = 0; i < newOperation.length; i++) {
    if (newOperation.includes('+') == true) {
      //an addition operation is found in the equation
      let occurences = (`${newOperation.toString()}`.match(/[+]/) || []).length;
      console.log('occurences: ' + occurences);
      if (occurences == 1) {
        additionEquation += `["${newOperation[newOperation.indexOf('+') - 1]}","${
          newOperation[newOperation.indexOf('+') + 1]
        }"]`;
        additionEquation = JSON.parse(additionEquation);
        break;
      } else {
        for (let i = 0; i < occurences; i++) {
          if (newOperation.indexOf('+', i + 1) == occurences) {
            break;
          }
          additionEquation += `["${newOperation[newOperation.indexOf('+') - 1]}","${
            newOperation[newOperation.indexOf('+') + 1]
          }"]`;
        }
        additionEquation = JSON.parse(additionEquation);
      }
    }
  }
  for (let i = 0; i < newOperation.length; i++) {
    if (newOperation.includes('-') == true) {
      //a subtraction operation is found in the equation
      let occurences = (`${newOperation.toString()}`.match(/[-]/) || []).length;
      if (occurences == 1) {
        subtractEquation += `["${newOperation[newOperation.indexOf('-') - 1]}","${
          newOperation[newOperation.indexOf('-') + 1]
        }"]`;
        subtractEquation = JSON.parse(subtractEquation);
        break;
      } else {
        for (let i = 0; i < occurences; i++) {
          if (newOperation.indexOf('-', i + 1) == occurences) {
            break;
          }
          subtractEquation += `["${newOperation[newOperation.indexOf('-') - 1]}","${
            newOperation[newOperation.indexOf('-') + 1]
          }"]`;
        }
        subtractEquation = JSON.parse(subtractEquation);
      }
    }
  }
  console.log('divide: ' + divideEquation);
  console.log('multiply: ' + multiplyEquation);
  console.log('sum: ' + additionEquation);
  console.log('subtract: ' + subtractEquation);

  //equation must obide by order of operations (or BIDMAS; in this case, just 'DMAS')
  if (divideEquation.length !== null) {
    //a division must be made first
    //console.log('DIVIDE OPER: ' + divide(divideEquation));
    //console.log('divide function: ' + newOperation);
    //console.log('index: ' + indexOfDivision);
    console.log('newoperation after: ' + newOperation);
  }
  if (multiplyEquation.length !== null) {
    //followed by multiplication
    console.log('MULTIPLY OPER: ' + multiply(multiplyEquation));
    console.log('MULTIPLY newOperation: ' + newOperation);
    console.log('MULTIPLY operation: ' + operation);
    let indexOfMultiply = newOperation.indexOf('*');
    console.log('index: ' + indexOfMultiply);
    newOperation.splice(indexOfMultiply - 1, 3);
    newOperation[indexOfMultiply - 1] = multiply(multiplyEquation);
    console.log('newoperation after: ' + newOperation);
    multiplyEquation = [];
  }
  if (additionEquation.length !== null) {
  }
  if (subtractEquation.length !== null) {
  }
  console.log('output: ' + output);
}
operate(['1', '2', '+', '7', '-', '5', '*', '3', '/', '2']);

/* NOTES:

Division is working, however multiplication is 
trying to multiply the number in front of it *before* the division occured.
Multiply needs to multiply the new number made by the division.

*/
