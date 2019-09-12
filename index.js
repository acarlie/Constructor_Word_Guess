"use strict";

const inquirer = require("inquirer");
const Word = require("./word");

function guess(){
    return inquirer
    .prompt({
        type: "input",
        message: "Guess a letter!",
        name: "guess"
      })
      .then(res => {return res});
}

const guessAndRespond = async (word) => {
    let res = await guess();
    let regex = /^[a-z]$/i;
    if (regex.test(res.guess)){
        word.checkLetter(res.guess);
        word.print();
        if (!word.hasWon()){
            guessAndRespond(word);
        } else {
            console.log('Youve won!');
        }
    } else {
        console.log("Please only guess letters, one at a time. Please guess again:");
        guessAndRespond(word);
    }
    
}

function init(){
    let newWord = new Word('hello');
    newWord.print();
    guessAndRespond(newWord);

}

init();
