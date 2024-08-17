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
            if (secondNum !== 0){
                ans = divide(firstNum,secondNum);
            } else {
                ans = undefined;
                console.log("Cannot divide by 0!")
            }
            
            break;
    }

    return ans;
}

// -----------------------------------
// Calculator starts here
// ------------------------------------

let historyDisplay = document.querySelector(".historyDisplay");
let historyDisplayvalue = ' ';
historyDisplay.textContent = historyDisplayvalue;

let calculatorDisplay = document.querySelector(".calculatorDisplay");
calculatorDisplay.textContent = 0;

let firstNum;
let secondNum;
let operator;
let newNum = true;
let decimalFlag = false;
let ans = undefined;
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
// Helper functions
// ------------------------------------

function resetVar() {
    firstNum = undefined;
    secondNum = undefined;
    operator = undefined;
    newNum = true;
    decimalFlag = false;
    ans = undefined;
 
}

function convertStringToNumOrUnicorn(str){

    let currDisplayStr = calculatorDisplay.textContent;
    let isNum = !isNaN(parseFloat(currDisplayStr)) && isFinite(currDisplayStr);

    if(isNum) {
        return parseFloat(str);
    } else {
        return 'unicorn!';
    }
}


// -----------------------------------
// Calculate answer
// ------------------------------------
function updateHistoryDisplay(event){
    log('--------- check history');
    
    valClicked = event.target.textContent;

    if(valClicked === '=' && secondNum === undefined){
        historyDisplayvalue = `${firstNum} =`;
        if (logMessage) {console.log("... Updating history display...: if");}

    } else if ((valClicked === '+'
            || valClicked === '-'
            || valClicked === 'x'
            || valClicked === '/'
    ) && secondNum === undefined){
        historyDisplayvalue = `${firstNum} ${operator}`;
        if (logMessage) {console.log("... Updating history display...: else if - 1st");}

    } else if (valClicked === '=' && secondNum !== undefined ){
        historyDisplayvalue = `${firstNum} ${operator} ${secondNum} =`;
        if (logMessage) {console.log("... Updating history display...: else if -2nd");}
    }
    
    historyDisplay.textContent = historyDisplayvalue;
}

function calculateAnswer(event) {
    console.log("----- [Click] equalButton clicked!");

    let currDisplayStr = calculatorDisplay.textContent;
    let currDisplay = convertStringToNumOrUnicorn(currDisplayStr);

    if (currDisplay=== 'unicorn!'){
        resetVar();
        log(`--------- After equal button: UNICORN`);
    } else {

        if(firstNum === undefined){
            firstNum = currDisplay;
            ans = firstNum;
            log('--------- After = button: if');
        } else if (firstNum !== undefined && operator && !secondNum){
            secondNum = currDisplay;
            ans = operate(firstNum, secondNum, operator);
            console.log(ans);
            log('--------- After = button: else if - 1st');
        } else if (firstNum !== undefined&& operator && secondNum){
            ans = operate(firstNum, secondNum, operator);
            log('--------- After = button: else if - 2nd');
        }

        if (ans === undefined || ans === NaN){
            ans = "unicorn!";
            resetVar();
        };
            
        calculatorDisplay.textContent = ans;
        updateHistoryDisplay(event);
        resetVar()
    }
    
}

let equalButton = document.querySelector("#equalButton")
equalButton.addEventListener("click", calculateAnswer);

// -----------------------------------
// clear calculator
// ------------------------------------

function clearDisplay() {
    console.log("----- [Click] clearButton clicked!");

    calculatorDisplay.textContent = 0;
    resetVar()
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
    let currDisplay = convertStringToNumOrUnicorn(currDisplayStr);

    if (currDisplay=== 'unicorn!'){
        resetVar();
        log(`--------- After operator button: UNICORN`);
    } else {
        if(!operator){
            firstNum = currDisplay;
            operator = event.target.textContent;
            newNum = true;
            decimalFlag = false;
            log(`--------- After operator button: if`);
    
        } else {
            if (!secondNum){
                secondNum = currDisplay;
            }
            firstNum = operate(firstNum,secondNum,operator)
            secondNum = undefined;
            newNum = true;
            decimalFlag = false;
            calculatorDisplay.textContent = firstNum;
            operator = event.target.textContent;
            firstOperatorClicked = true;
            log(`--------- After operator button: else`);
        };
        updateHistoryDisplay(event);
    }
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

    if (currDisplayStr === "unicorn!"){
        historyDisplay.textContent ='';
    }
    let currDisplay = parseFloat(currDisplayStr);
    let newDisplayStr = event.target.textContent;
    let newDisplay = parseFloat(newDisplayStr);

    if (newNum){
        calculatorDisplay.textContent = newDisplay;
        newNum = false;
        log(`--------- After num button: if`);
    } else if (!newNum){
        if (currDisplayStr == "0") {
            calculatorDisplay.textContent = newDisplay;
        } else {
            calculatorDisplay.textContent += newDisplay;
        }
        
        log('--------- After num button: else if - end');
    }
    
}

let numButtonsList = document.querySelectorAll("#numButton")
for (let i=0; i<numButtonsList.length; i++){
    numButtonsList[i].addEventListener("click", displayNum);
}


// -----------------------------------
// Add decimal
// ------------------------------------

function addDecimal() {
    console.log("----- [Click] decimalButton clicked!");

    let currDisplayStr = calculatorDisplay.textContent;
    if (currDisplayStr.includes(".")){
        decimalFlag = true;
    };

    let currDisplay = parseFloat(currDisplayStr);

    if (decimalFlag === false){
        decimalFlag = true;

        if (firstNum===undefined){
            //firstNum = currDisplay;
            newNum = false;
        }

        calculatorDisplay.textContent += '.';

    } else if (decimalFlag === true) {
        calculatorDisplay.textContent = "unicorn!";
    }
    
    log('--------- After decimal button');
}

let decimalButton = document.querySelector("#decimalButton")
decimalButton.addEventListener("click", addDecimal);

// -----------------------------------
// Percentage
// ------------------------------------

let percentageFlag = 0;

function showPercentage() {
    console.log("----- [Click] percentageButton clicked!");

    let currDisplayStr = calculatorDisplay.textContent.replace("%", "");
    if (isNum(currDisplayStr)) {
        let currDisplay = parseFloat(currDisplayStr);

        if (!percentageFlag) {
            calculatorDisplay.textContent = `${currDisplay/100}%`;
            percentageFlag = 1;
            resetVar();
        } else {
            calculatorDisplay.textContent = `${currDisplay*100}`;
            percentageFlag = 0;
        }
    }
    log('--------- After percentage button');
}

let percentageButton = document.querySelector("#percentageButton")
percentageButton.addEventListener("click", showPercentage);