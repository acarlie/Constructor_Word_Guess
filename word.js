const Letter = require('./letter');

function Word (word) {
  this.arr = word.split('');
  this.letters = this.arr.map(x => new Letter(x));
  this.guesses = 8;
}

Word.prototype = {
  hasLost: function () {
    return this.guesses === 0;
  },
  hasWon: function () {
    return this.letters.every(x => x.guessed === true);
  },
  print: function () {
    let toPrint = '';
    for (const x of this.letters) {
      toPrint += x.display() + ' ';
    }
    console.log(`\n${toPrint}\n`);
  },
  checkLetter: function (guess) {
    for (const x of this.letters) {
      x.check(guess);
    }
  }
};

module.exports = Word;
