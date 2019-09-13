"use strict";

const inquirer = require("inquirer");
const Word = require("./word");

const wordArray = ["hello", "world", "test"];
const wordObjs = wordArray.map(x => new Word(x));

function init(){
    let vals = chooseWord(wordObjs);
    let word = vals.word;
    let remain = vals.remaining;
    word.print();
    guessAndRespond(word, remain);
}

function guess(){
    return inquirer
    .prompt({
        type: "input",
        message: "Guess a letter!",
        name: "guess"
      })
      .then(res => { return res });
}
 
function confirmPlay(){
    return inquirer
    .prompt({
        type: "confirm",
        message: "Play Again?",
        name: "play",
        default: true
    })
    .then(res => { return res });
}

function chooseWord(arr){
    let num = Math.floor(Math.random()*arr.length);
    return { word: arr[num], remaining: arr.filter(x => x !== arr[num]) };
}



async function playAgain(rem){
    let res = await confirmPlay();

    if (res.play){
        let vals = chooseWord(rem);
        let word = vals.word;
        let remain = vals.remaining;
        word.print();
        guessAndRespond(word, remain);
    } else {
        console.log('Okay :-(');
    }
}


const guessAndRespond = async (word, rem) => {
    let res = await guess();
    let regex = /^[a-z]$/i;

    if (regex.test(res.guess)){

        if (word.arr.indexOf(res.guess) === -1){
            word.guesses--;
            console.log(`${res.guess} was not found, you have ${word.guesses} remaining.\n`)
        } 

        word.checkLetter(res.guess);
        word.print();

        checkWinOrLose(word.hasWon(), word.guesses, word, rem, guessAndRespond);

        nextPuzzle(word.hasWon(), word.hasLost(), rem, playAgain)

    } else {
        console.log("Please only guess letters, one at a time. Please guess again:\n");
        guessAndRespond(word, rem);
    }
    
}

function nextPuzzle(win, lose, rem, cb){
    if ((win || lose) && rem.length > 0){
        cb(rem);
    } else if ((win || lose) && rem.length === 0){
        console.log('All puzzles have been played');
    }

}

function checkWinOrLose(hasWon, guesses, word, rem, cb){
    if (!hasWon && guesses > 0){
        cb(word, rem);
    } else if (!hasWon && guesses === 0){
        console.log('Youve lost :(');
    } else {
        console.log('Youve won!');
    }
}

init();
