// 1. Deposit money
// 2. Determine the number of lines to bet
// 3. Collect bet amount
// 4. Spin the slot machine
// 5. Determine the result
// 6. Collect the winnings
// 7. Play again

const prompt = require('prompt-sync')();


const ROWS = 3;
const COLS = 3;
const SYMBOLS_COUNT = {
    "A":2,
    "B":4,
    "C":6,
    "D":8,
};

const SYMBOL_VALUES = {
    "A":5,
    "B":4,
    "C":3,
    "D":2,
};



 const deposit = () => {

    while(true){
    const depositAmount = prompt('Please enter the amount you would like to deposit: ');
    const numberDepositAmount = parseFloat(depositAmount);

        if(isNaN(numberDepositAmount) || numberDepositAmount <= 0){
        console.log('Please enter a valid amount');
        }else{
         return numberDepositAmount; 
        }
    }
 };

 const getNumberOfLines = () => {
    while(true){
        const lines = prompt('Please enter the number of lines to bet on (1-3): ');
        const getNumberOfLines = parseInt(lines);
    
            if(isNaN(getNumberOfLines) || getNumberOfLines <= 0 || getNumberOfLines > 3){
            console.log('Please enter a valid number of lines');
            }else{
             return getNumberOfLines; 
            }
        }
 };

 const getBet = (balance, lines) =>{
    while(true){
        const bet = prompt('Please enter the amount you would like to bet per line: ');
        const numberBet = parseFloat(bet);

        if(isNaN(numberBet) || numberBet <= 0 || numberBet > balance / lines){
            console.log('Please enter a valid amount');
        }else {
            return numberBet;
        }
    }
 };

 const spin = () => {
    const symbols = [];
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
        for (let i = 0; i < count; i++) {
            symbols.push(symbol);
        }
    }
    
    const reels = [];
    for (let i = 0; i < COLS; i++){
        reels.push([]);
        const reelSymbols = [...symbols];
        for (let j = 0 ; j < ROWS; j++){
            const randomIndex = Math.floor(Math.random() * reelSymbols.length);
            const selectedSymbol = reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex, 1);
        }
    }
    return reels;
 };
 const transpose = (reels) => {
    const rows = [];

    for( let i = 0; i<ROWS; i++){
        rows.push([]);
        for (let j = 0; j < COLS; j++){
            rows[i].push(reels[j][i]);
        }
 }
    return rows;
};

 const printRows = (rows) => {
    for (const row of rows){
        let rowString = "";
        for ( const [i, symbol] of row.entries()){
            rowString += symbol;
            if(i != row.length - 1){
                rowString += " | ";
            }
        }
        console.log(rowString);
    }

 };

  const getWinnings = (rows, bet, lines) => {
    let winnings = 0;
    for (let row = 0; row < lines; row++){
        const symbols = rows[row];
        let allSame = true;

        for ( let symbol of symbols){
            if(symbol != symbols[0]){
                allSame = false;
                break;
            }
        } 

        if(allSame){
            winnings += bet * SYMBOL_VALUES[symbols[0]];
        }
    }

    return winnings;    
  };

  const game = () => {
    
    let balance = deposit();

    while(true){
        console.log(`Your balance is $${balance}`);
        const numberOfLines = getNumberOfLines();
        const bet = getBet(balance, numberOfLines);
        balance -= bet * numberOfLines
        const reels =spin();
        const rows = transpose(reels);
           printRows(rows);
       const winnings = getWinnings(rows, bet, numberOfLines);
        balance += winnings;
        console.log(`You won $${winnings}`);

        if(balance <= 0){
            console.log('You are out of money');
            break;
        }

        const playAgain = prompt('Would you like to play again? (y/n): ');
        if(playAgain != 'y'){
            break;
        }
    }
 
  };

    game();
 