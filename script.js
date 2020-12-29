let typedNumber = [];
let parsedEquation = [];
let persistentAnswer;

let hasEnteredFirstNumber = false;

function add(num1, num2) {
  const result = parseFloat(num1) + parseFloat(num2);
  return Math.round(result * 100) / 100;
}
function subtract(num1, num2) {
  const result = parseFloat(num1) - parseFloat(num2);
  return Math.round(result * 100) / 100;
}
function multiply(num1, num2) {
  const result = parseFloat(num1) * parseFloat(num2);
  return Math.round(result * 100) / 100;
}
function divide(num1, num2) {
  const result = parseFloat(num1) / parseFloat(num2);
  return Math.round(result * 100) / 100;
}

function operate(givenEquation) {
  function persistExisitingAnswer(functionName) {
    parsedEquation = [];
    switch (functionName) {
      case 'add':
        persistentAnswer = add(givenEquation[0], givenEquation[2]);
        break;
      case 'subtract':
        persistentAnswer = subtract(givenEquation[0], givenEquation[2]);
        break;
      case 'multiply':
        persistentAnswer = multiply(givenEquation[0], givenEquation[2]);
        break;
      case 'divide':
        persistentAnswer = divide(givenEquation[0], givenEquation[2]);
        break;
    }
    parsedEquation.push(persistentAnswer);
  }
  if (givenEquation.includes('+')) {
    persistExisitingAnswer('add');
    return add(givenEquation[0], givenEquation[2]);
  }
  if (givenEquation.includes('-')) {
    persistExisitingAnswer('subtract');
    return subtract(givenEquation[0], givenEquation[2]);
  }
  if (givenEquation.includes('*')) {
    persistExisitingAnswer('multiply');
    return multiply(givenEquation[0], givenEquation[2]);
  }
  if (givenEquation.includes('/')) {
    persistExisitingAnswer('divide');
    return divide(givenEquation[0], givenEquation[2]);
  }
}

function operateFromOperator(operator) {
  console.log('operate function entered');
  function pushNumber() {
    console.log('push function entered');
    parsedEquation.push(typedNumber.join(''));
    typedNumber = [];
    typedNumber.push(`${operate(parsedEquation)}`);
  }
  switch (operator) {
    case 'plus':
      pushNumber();
      parsedEquation.push('+');
      hasEnteredFirstNumber = true;
      break;
    case 'subtract':
      pushNumber();
      parsedEquation.push('-');
      hasEnteredFirstNumber = true;
      break;
    case 'multiply':
      pushNumber();
      parsedEquation.push('*');
      hasEnteredFirstNumber = true;
      break;
    case 'divide':
      pushNumber();
      parsedEquation.push('/');
      hasEnteredFirstNumber = true;
      break;
  }
}

const button = document.querySelectorAll('button');
for (let i = 0; i < button.length; i++) {
  button[i].addEventListener('click', function (e) {
    buttonPress(e.target);
    console.log('typedNumber: ', typedNumber);
    console.log('parsed equation: ', parsedEquation);
    console.log('persistent answer: ', persistentAnswer);
  });
}

function buttonPress(buttonObj) {
  const calculationText = document.querySelector('#result');
  switch (buttonObj.id) {
    case 'backspace':
      if (typedNumber[0] == '0') {
        return;
      } else if (typedNumber.length == 1) {
        typedNumber = ['0'];
      } else {
        typedNumber.pop();
      }
      break;
    case 'clear':
      typedNumber = ['0'];
      parsedEquation = [];
      persistentAnswer = undefined;
      break;
    //Math Operators
    case 'divide':
      flash();
      if (parsedEquation.length == 2) {
        operateFromOperator('divide');
      } else {
        concatNumber('divide');
      }
      break;
    case 'multiply':
      flash();
      if (parsedEquation.length == 2) {
        operateFromOperator('multiply');
      } else {
        concatNumber('multiply');
      }
      break;
    case 'plus':
      flash();
      if (parsedEquation.length == 2) {
        operateFromOperator('plus');
      } else {
        concatNumber('plus');
      }
      break;
    case 'subtract':
      flash();
      if (parsedEquation.length == 2) {
        operateFromOperator('subtract');
      } else {
        concatNumber('subtract');
      }
      break;
    case 'decimal':
      if (typedNumber.includes(buttonObj.textContent)) {
        return;
      } else {
        typedNumber.push('.');
      }
      break;
    case 'equal':
      flash();
      concatNumber('equal');
      typedNumber.push(`${operate(parsedEquation)}`);
      persistentAnswer = `${operate(parsedEquation)}`;
      break;
    default:
      if (hasEnteredFirstNumber == true) {
        typedNumber = [];
        hasEnteredFirstNumber = false;
      }
      if (typedNumber[0] == '0') {
        typedNumber.pop();
        typedNumber.push(buttonObj.textContent);
      } else {
        typedNumber.push(buttonObj.textContent);
      }
      break;
  }
  if (calculationText == '') {
    calculationText.textContent = '0';
  }
  calculationText.textContent = typedNumber.join('');
}

function flash() {
  const calculationText = document.querySelector('#result');
  calculationText.style.opacity = '0%';
  setTimeout(() => {
    calculationText.style.opacity = '100%';
  }, 50);
}

function concatNumber(operator) {
  parsedEquation.push(typedNumber.join(''));
  switch (operator) {
    case 'plus':
      parsedEquation.push('+');
      break;
    case 'multiply':
      parsedEquation.push('*');
      break;
    case 'subtract':
      parsedEquation.push('-');
      break;
    case 'divide':
      parsedEquation.push('/');
      break;
    case 'equal':
      typedNumber = [];
      break;
  }
  hasEnteredFirstNumber = true;
}
