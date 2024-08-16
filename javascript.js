function add(a,b) {
    return a+b;
}

function subtract(a,b) {
    return a-b;
}

function multiply(a,b) {
    return a*b;
}

function divide(a,b) {
    return a/b;
}

function operate(firstNum, secondNum, operator) {

    let ans;

    switch(operator) {
        case '+':
            ans = add(firstNum,secondNum);
            break;
        case '-':
            ans = subtract(firstNum,secondNum);
            break;
        case 'x':
            ans = multiply(firstNum,secondNum);
            break;
        case '/':
            ans = divide(firstNum,secondNum);
            break;
    }

    return ans;
}

// -----------------------------------
// Calculator starts here
// ------------------------------------
let historyDisplay = document.querySelector(".historyDisplay");
let historyDisplayvalue = '';
historyDisplay.textContent = historyDisplayvalue;

let calculatorDisplay = document.querySelector(".calculatorDisplay");
calculatorDisplay.textContent = 0;

let firstNum;
let secondNum;
let operator;
let newNum = true;
let logMessage = true;

function log (message) {
    if (logMessage === true) {
        console.log(message);
        console.log(`newNum: ${newNum}`);
        console.log(`firstnum: ${firstNum}, secondNum = ${secondNum}, operator = ${operator}`);
    };
}

log('========= Start calculator');
// -----------------------------------
// Calculate answer
// ------------------------------------
function updateHistoryDisplay(event){
    
    if (logMessage) {console.log("... Updating history display...");}

    valClicked = event.target.textContent;
    console.log(valClicked);

    if(valClicked === '=' && !secondNum){
        historyDisplayvalue = `${firstNum} =`;
        if (logMessage) {console.log("... Updating history display...: if");}
    } else if ((valClicked === '+'
            || valClicked === '-'
            || valClicked === 'x'
            || valClicked === '/'
    ) && !secondNum){
        historyDisplayvalue = `${firstNum} ${operator}`;
        if (logMessage) {console.log("... Updating history display...: else if - 1st");}
    } else if (valClicked === '=' && secondNum){
    historyDisplayvalue = `${firstNum} ${operator} ${secondNum} =`;
    if (logMessage) {console.log("... Updating history display...: else if -2nd");}
    }
    
    historyDisplay.textContent = historyDisplayvalue;
}

function calculateAnswer(event) {
    console.log("----- [Click] equalButton clicked!");

    let currDisplayStr = calculatorDisplay.textContent;
    let currDisplay = parseFloat(currDisplayStr);
    let ans;

    if(!firstNum){
        firstNum = currDisplay;
        ans = firstNum;
        log('--------- After = button: if');
    } else if (firstNum && operator && !secondNum){
        secondNum = currDisplay;
        ans = operate(firstNum, secondNum, operator);
        log('--------- After = button: else if - 1st');
    } else if (firstNum && operator && secondNum){
        ans = operate(firstNum, secondNum, operator);
        log('--------- After = button: else if - 2nd');
    }
        
    calculatorDisplay.textContent = ans;
    updateHistoryDisplay(event);
    firstNum = undefined;
    secondNum = undefined;
    operator = undefined;
    newNum = true;
    
}

let equalButton = document.querySelector("#equalButton")
equalButton.addEventListener("click", calculateAnswer);

// -----------------------------------
// clear calculator
// ------------------------------------

function clearDisplay() {
    console.log("----- [Click] clearButton clicked!");

    calculatorDisplay.textContent = 0;
    firstNum = undefined;
    secondNum = undefined;
    operator = undefined;
    newNum = true;
    historyDisplay.textContent = '';

    log('--------- After clear button');
}

let clearButton = document.querySelector("#clearButton")
clearButton.addEventListener("click", clearDisplay);

// -----------------------------------
// Operator
// ------------------------------------

function clickOperator(event) {
    console.log("----- [Click] operatorButton clicked!");

    let currDisplayStr = calculatorDisplay.textContent;
    let currDisplay = parseFloat(currDisplayStr);
    
    if(!operator){
        firstNum = currDisplay;
        operator = event.target.textContent;
        newNum = true;
        log(`--------- After operator button: if`);

    } else {
        if (!secondNum){
            secondNum = currDisplay;
        }
        firstNum = operate(firstNum,secondNum,operator)
        secondNum = undefined;
        newNum = true;
        calculatorDisplay.textContent = firstNum;
        operator = event.target.textContent;
        firstOperatorClicked = true;
        log(`--------- After operator button: else`);
    };

    updateHistoryDisplay(event);
}

let operatorButtonsList = document.querySelectorAll("#operatorButton")
for (let i=0; i<operatorButtonsList.length; i++){
    operatorButtonsList[i].addEventListener("click", clickOperator);
}

// -----------------------------------
// Display numbers
// ------------------------------------

function displayNum(event) {
    console.log("----- [Click] numButton clicked!");

    let currDisplayStr = calculatorDisplay.textContent;
    let currDisplay = parseFloat(currDisplayStr);
    let newDisplayStr = event.target.textContent;
    let newDisplay = parseFloat(newDisplayStr);

    if (newNum){
        calculatorDisplay.textContent = newDisplay;
        newNum = false;
        log(`--------- After num button: if`);
    } else if (!newNum){
        calculatorDisplay.textContent += newDisplay;
        log('--------- After num button: else if - end');
    }
    
}

let numButtonsList = document.querySelectorAll("#numButton")
for (let i=0; i<numButtonsList.length; i++){
    numButtonsList[i].addEventListener("click", displayNum);
}