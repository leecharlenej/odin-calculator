let displayNumStr = '0';
let firstOperatorClicked = false;
let calculatorDisplay = document.querySelector(".calculatorDisplay");
calculatorDisplay.textContent = displayNumStr;

function displayNums (event) {

    if (firstOperatorClicked) {
        displayNumStr = event.target.textContent;

    } else {
        if (displayNumStr==='0'){
            displayNumStr = event.target.textContent;
        } else {
            displayNumStr += event.target.textContent;
        }
    }
    
    calculatorDisplay.textContent = displayNumStr;
}


let numButtonsList = document.querySelectorAll("#numButton");
for (let i=0; i<numButtonsList.length; i++) {
    numButtonsList[i].addEventListener("click", displayNums);
}

function clickOperator(event) {
    let firstNum = parseFloat(calculatorDisplay.textContent);
    let secondNum = firstNum;
    let operator = event.target.textContent;
    firstOperatorClicked = true;  
}

let operatorButtonsList = document.querySelectorAll("#operatorButton");
for (let i=0; i<operatorButtonsList.length; i++) {
    operatorButtonsList[i].addEventListener("click", clickOperator);
}












// function isNum (str) {
//     return !isNaN(parseFloat(str)) && isFinite(str);

// }

// function displayOnCal (num) {
//     let calculatorDisplay = document.querySelector(".calculatorDisplay");
//     calculatorDisplay.textContent = displayNum;
// }

// let displayNum = 0;
// displayOnCal(displayNum);





// function showDisplay (event) {

//     let firstNum = parseFloat(calculatorDisplay.textContent);
//     let secondNum = firstNum;
//     let operator = '+';
//     let ans = 'ERROR';
//     let firstNumFilled = false;

//     let buttonClickedVal = event.target.textContent;
//     let buttonClickedVal_num = isNum(buttonClickedVal);
//     console.log(buttonClickedVal_num);

//     if (!buttonClickedVal_num) {
//         switch(buttonClickedVal) {
//             case '=':
//                 ans = operate(firstNum, secondNum, operator);
//                 calculatorDisplay.textContent = ans;
//                 console.log(`= button clicked. ans = ${ans}`);
//                 break;

//             case 'Clear':
//                 firstNum = 0;
//                 secondNum = 0;
//                 operator = '+';
//                 calculatorDisplay.textContent = 0;
//                 firstNumFilled = false;
//                 console.log(`Clear button clicked. ans = ${ans}`);
//                 break;

//             default:
//                 firstNum = calculatorDisplay.textContent;
//                 secondNum = firstNum;
//                 operator = buttonClickedVal;
//                 firstNumFilled = true;
//                 console.log(`operator button clicked. operator = ${operator}`);
//         }
//     } else if (buttonClickedVal_num) {

//         if (displayNum === 0) {
//             displayNum = event.target.textContent;
//         } else {
//             displayNum += event.target.textContent;
//         }
        
//         calculatorDisplay.textContent = displayNum;
        
//         if (firstNumFilled) {
//             calculatorDisplay.textContent =event.textContent;
//             secondNum = calculatorDisplay.textContent;
//         } 
//     }
    

//     // calculatorDisplay.textContent = displayNum;
// }

// const buttonClicked = document.querySelectorAll("button");
// for (let i=0; i<buttonClicked.length; i++) {
//     buttonClicked[i].addEventListener("click", showDisplay);
// }

