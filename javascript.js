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
        case '*':
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
let calculatorDisplay = document.querySelector(".calculatorDisplay");
calculatorDisplay.textContent = 11;

let firstNum = parseFloat(calculatorDisplay.textContent);
let secondNum;
let operator;
let firstOperatorClicked = true;
let brandNew = true;

console.log(`brandNew: ${brandNew}, firstOperatorClicked: ${firstOperatorClicked}`);
console.log(`firstnum: ${firstNum}, secondNum = ${secondNum}, operator = ${operator}`);


function calculateAnswer() {
    console.log("----- [Click] equalButton clicked!");
    console.log(`brandNew: ${brandNew}, firstOperatorClicked: ${firstOperatorClicked}`);
    console.log(`firstnum: ${firstNum}, secondNum = ${secondNum}, operator = ${operator}`);

    let ans = firstNum;

    if (secondNum && operator){
        ans = operate(firstNum, secondNum, operator);
    }
        
    calculatorDisplay.textContent = ans;
    console.log("Clicked operator button.")
}

let equalButton = document.querySelector("#equalButton")
equalButton.addEventListener("click", calculateAnswer);

function clearDisplay() {
    console.log("----- [Click] clearButton clicked!");

    calculatorDisplay.textContent = 0;
    firstNum = parseFloat(calculatorDisplay.textContent);
    secondNum = undefined;
    operator = undefined;
    firstOperatorClicked = true;
    brandNew = true;

    console.log(`brandNew: ${brandNew}, firstOperatorClicked: ${firstOperatorClicked}`);
    console.log(`firstnum: ${firstNum}, secondNum = ${secondNum}, operator = ${operator}`);
}

let clearButton = document.querySelector("#clearButton")
clearButton.addEventListener("click", clearDisplay);


function clickOperator(event) {
    console.log("----- [Click] operatorButton clicked!");
    console.log(`brandNew: ${brandNew}, firstOperatorClicked: ${firstOperatorClicked}`);
    console.log(`firstnum: ${firstNum}, secondNum = ${secondNum}, operator = ${operator}`);
    
    if(firstOperatorClicked){
        firstNum = parseFloat(calculatorDisplay.textContent);
        secondNum = firstNum;
        operator = event.target.textContent;
        firstOperatorClicked = false;
        console.log(`firstOperatorClick: ${firstOperatorClicked}`);
        console.log(`firstnum: ${firstNum}, secondNum = ${secondNum}, operator = ${operator}`);
    } else {
        firstNum = operate(firstNum,secondNum,operator)
        calculatorDisplay.textContent = firstNum;
        operator = event.target.textContent;
        firstOperatorClicked = true;
        console.log(`firstOperatorClick: ${firstOperatorClicked}`);
        console.log(`firstnum: ${firstNum}, secondNum = ${secondNum}, operator = ${operator}`);
    };
}

let operatorButtonsList = document.querySelectorAll("#operatorButton")
for (let i=0; i<operatorButtonsList.length; i++){
    operatorButtonsList[i].addEventListener("click", clickOperator);
}


function displayNum(event) {
    console.log("----- [Click] numButton clicked!");
    console.log(`brandNew: ${brandNew}, firstOperatorClicked: ${firstOperatorClicked}`);
    console.log(`firstnum: ${firstNum}, secondNum = ${secondNum}, operator = ${operator}`);

    let currDisplay = calculatorDisplay.textContent;
    let newDisplay = event.target.textContent;
    console.log(currDisplay)

    if (brandNew && currDisplay === '0'){
        calculatorDisplay.textContent = newDisplay;
        brandNew = false;
    } else {
        calculatorDisplay.textContent += newDisplay;
    }
}

let numButtonsList = document.querySelectorAll("#numButton")
for (let i=0; i<numButtonsList.length; i++){
    numButtonsList[i].addEventListener("click", displayNum);
}