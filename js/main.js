  const calculator = document.querySelector('.calculator');
  const display = calculator.querySelector('#display');
  const buttons = calculator.querySelectorAll('button');
  const displayHistory = calculator.querySelector('#displayHistory');
  let firstValue = null;
  let operator = null;
  let waitingForSecondValue = false;
  let result = null;
  let history = '';
  let operatorsGroup = ['+', '-', '*', '/'];

  const handleNumber = (e) => {
    const value = Number(e.target.value);
    if (waitingForSecondValue) {
      display.value = value;
      waitingForSecondValue = false;
    } else {
      display.value = (display.value === 0) ? value : display.value + value;
    }
    if (display.value[display.value.length-1] === '.' && operator) {
      history += '0';
    }
    displayHistory.value = history += value;
  }

  const handleOperator = (e) => {
    if(operator) return;
    const value = e.target.value;
    if (display.value[display.value.length-1] === '.') {
      if(!operatorsGroup.includes(history[history.length-1])) {
        history += '0';
      }
    } if(operatorsGroup.includes(history[history.length-1])) {
      return;
    } else {
      displayHistory.value = history += value;
    }
    if (firstValue && operator) {
      handleEqual();
    }
    operator = value;
    if (result) {
      firstValue = result;
    } else if (!firstValue) {
      firstValue = parseFloat(display.value);
      display.value = '';
    }
    waitingForSecondValue = true;
  }

  const handleEqual = () => {
    if (display.value[display.value.length-1] === '.') {
      if(history[history.length-1] !== /[+\-*/=]/) {
        if(history[history.length-1] !== /[+\-*/=]/) {
          history += '0';
        }
      }
    }
    if (firstValue && operator && display.value) {
      let secondValue = parseFloat(display.value);
      if (firstValue < 0 && operator === '-' && secondValue < 0) {
        operator = '+';
        result = eval(firstValue + operator + (secondValue * -1));
      } else {
        result = eval((firstValue) + operator + (secondValue));
      }
      displayHistory.value = history += `=${result}`;
      firstValue = result;
      display.value = result;
      operator = null;
    }
  }

  const handleClear = () => {
    display.value = '';
    firstValue = null;
    operator = null;
    waitingForSecondValue = false;
    result = null;
    displayHistory.value = history = '';
  }

  const handleOnePercent = () => {
    if (!isNaN(display.value)) {
      display.value = Number(display.value) / 100;
    }
  }

  const handleDecimal = () => {
    if (!display.value.includes('.')) {
      display.value += '.';
      displayHistory.value = history += '.';
    }
  }

    const handleNegativeValue = () => {
      if (display.value !== '')
      display.value = -Number(display.value)
    }

    buttons.forEach(button => {
      if (button.classList.contains('number')) {
        button.addEventListener('click', handleNumber);
      } else if (button.classList.contains('operator')) {
        button.addEventListener('click', handleOperator);
      } else if (button.id === 'equals') {
        button.addEventListener('click', handleEqual);
      } else if (button.id === 'clear') {
        button.addEventListener('click', handleClear);
      } else if (button.id === 'decimal') {
        button.addEventListener('click', handleDecimal);
      } else if (button.id === 'onePercent') {
        button.addEventListener('click', handleOnePercent);
      } else if (button.id === 'negativeValue') {
        button.addEventListener('click', handleNegativeValue );
      }
    });

  document.addEventListener("keydown", event => {
    if (event.key === "+" || event.key === "-" || event.key === "*" || event.key === "/") {
      handleOperator({ target: { value: event.key } });
    } else if (event.key === "Enter") {
      handleEqual();
    } else if (event.key === "c" || event.key === "Escape") {
      handleClear();
    } else if (event.key === "%") {
      handleOnePercent();
    } else if (event.key === ".") {
      handleDecimal();
    } else if (event.key === "-") {
      handleNegativeValue();
    } else if (event.code.startsWith("Numpad")) {
      handleNumber({ target: { value: event.key } });
    } else if (event.code.startsWith("Digit")) {
      handleNumber({ target: { value: event.key } });
    }
  });
