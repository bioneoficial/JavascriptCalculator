const calculator = document.querySelector('.calculator');
const display = document.querySelector('#display');
const buttons = calculator.querySelectorAll('button');
let firstValue = null;
let operator = null;
let waitingForSecondValue = false;

function handleNumber(e) {
  const value = Number(e.target.value);
  if (waitingForSecondValue) {
    display.value = value;
    waitingForSecondValue = false;
  } else {
    display.value === 0 ? display.value = value : display.value += value;
  }
}

function handleOperator(e) {
  const value = e.target.value;
  if (!firstValue) {
    firstValue = parseFloat(display.value);
  }
  operator = value;
  waitingForSecondValue = true;
  display.value = '';
}

function handleEqual() {
  if (firstValue && operator && display.value) {
    display.value = eval(firstValue + operator + display.value);
    firstValue = null;
    operator = null;
  }
}

function handleClear() {
  display.value = '';
  firstValue = null;
  operator = null;
  waitingForSecondValue = false;
}

function handleOnePercent() {
  if (!isNaN(display.value)) {
    display.value = Number(display.value) / 100;
  }
}

function handleDecimal() {
  if (!display.value.includes('.')) {
    display.value += '.';
  }
}

buttons.forEach(button => {
  if (button.classList.contains('number')) {
    button.addEventListener('click', handleNumber);
  }else if (button.classList.contains('operator')) {
    button.addEventListener('click', handleOperator);
  }else if (button.id === 'equals') {
    button.addEventListener('click', handleEqual);
  }else if (button.id === 'clear') {
    button.addEventListener('click', handleClear);
  }else if (button.id === 'decimal') {
    button.addEventListener('click', handleDecimal);
  }else if (button.id=== 'onePercent') {
    button.addEventListener('click', handleOnePercent);
  }
});
