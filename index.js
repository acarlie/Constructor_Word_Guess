'use strict';

const colors = require('colors');
const Word = require('./word');
const questions = require('./questions');

colors.setTheme({
  win: ['bgGreen', 'black'],
  err: ['bgRed', 'black'],
  info: ['bgCyan', 'black']
});

const game = {
  wordArray: ['crimson', 'gold', 'lavender', 'cerulean', 'chartreuse', 'purple', 'teal'],
  init: function () {
    const wordObjs = this.wordArray.map(x => new Word(x));
    const word = this.chooseWord(wordObjs);
    const remain = this.remaining(word, wordObjs);

    word.print();
    this.guessAndRespond(word, remain);
  },
  remaining: function (word, arr) {
    return arr.filter(x => x !== word);
  },
  chooseWord: function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  },
  nextPuzzle: function (win, lose, rem, cb) {
    if ((win || lose) && rem.length > 0) {
      cb(rem);
    } else if ((win || lose) && rem.length === 0) {
      console.log(' All puzzles have been played '.info);
    }
  },
  checkWinOrLose: function (hasWon, guesses, word, rem, cb) {
    if (!hasWon && guesses > 0) {
      cb(word, rem);
    } else if (!hasWon && guesses === 0) {
      console.log(` T_T Oh no! You're out of guesses. \n`.err);
    } else {
      console.log(` .-*-.-*Puzzle complete!*-.-*-. \n`.win);
    }
  },
  guessAndRespond: async function (word, rem) {
    const me = game;
    const res = await questions.guess();
    const regex = /^[a-z]$/i;

    if (regex.test(res.guess)) {
      if (word.arr.indexOf(res.guess) === -1) {
        word.guesses--;
        console.log(`\n${res.guess.red} was not found, you have ${word.guesses.toString().red} guesses remaining.`);
      }

      word.checkLetter(res.guess);
      word.print();

      me.checkWinOrLose(word.hasWon(), word.guesses, word, rem, me.guessAndRespond);
      me.nextPuzzle(word.hasWon(), word.hasLost(), rem, me.playAgain);
    } else {
      console.log('\n Please only guess letters, one at a time. Please guess again: '.info);
      word.print();
      me.guessAndRespond(word, rem);
    }
  },
  playAgain: async function (rem) {
    const me = game;
    const res = await questions.confirmPlay();

    if (res.play) {
      const word = me.chooseWord(rem);
      const remain = me.remaining(word, rem);
      word.print();
      me.guessAndRespond(word, remain);
    } else {
      console.log('\n Okay :-( '.info);
    }
  }
};

game.init();
