"use strict";

const Word = require("./word");
const questions = require("./questions");

const game = {
    wordArray: ["hello", "world", "test"],
    init: function(){
        let wordObjs = this.wordArray.map(x => new Word(x));
        let word = this.chooseWord(wordObjs);
        let remain = this.remaining(word, wordObjs);

        word.print();

        this.guessAndRespond(word, remain);
    }, 
    remaining: function(word, arr){
        return arr.filter(x => x !== word);
    },
    chooseWord: function(arr){
        return arr[Math.floor(Math.random()*arr.length)];
    },
    nextPuzzle: function(win, lose, rem, cb){
        if ((win || lose) && rem.length > 0){
            cb(rem);
        } else if ((win || lose) && rem.length === 0){
            console.log('All puzzles have been played');
        }
    
    },
    checkWinOrLose: function(hasWon, guesses, word, rem, cb){
        if (!hasWon && guesses > 0){
            cb(word, rem);
        } else if (!hasWon && guesses === 0){
            console.log('Youve lost :(');
        } else {
            console.log('Youve won!');
        }
    },
    guessAndRespond: async function(word, rem){
        let me = game;
        let res = await questions.guess();
        let regex = /^[a-z]$/i;
    
        if (regex.test(res.guess)){
    
            if (word.arr.indexOf(res.guess) === -1){
                word.guesses--;
                console.log(`${res.guess} was not found, you have ${word.guesses} remaining.\n`)
            } 
    
            word.checkLetter(res.guess);
            word.print();
    
            me.checkWinOrLose(word.hasWon(), word.guesses, word, rem, me.guessAndRespond);
            me.nextPuzzle(word.hasWon(), word.hasLost(), rem, me.playAgain)
    
        } else {

            console.log("Please only guess letters, one at a time. Please guess again:\n");
            me.guessAndRespond(word, rem);

        }
    },
    playAgain: async function(rem){
        let me = game;
        let res = await questions.confirmPlay();
    
        if (res.play){
            let word = me.chooseWord(rem);
            let remain = me.remaining(word, rem);
            word.print();
            me.guessAndRespond(word, remain);
            
        } else {
            console.log('Okay :-(');
        }
    }
}

game.init();
