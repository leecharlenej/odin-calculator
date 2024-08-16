# odin-calculator

## Reflections
1. `buttonClicked[i].addEventListener("click", console.log('button clicked!'));`: () at the end of console.log will cause function to be executed immediately. it should be `buttonClicked[i].addEventListener("click", () => console.log('button clicked!'));`, i.e. `<ELEM>.addEventListener("click",<FUNCN_NAME>);`
2. Undo button not done.