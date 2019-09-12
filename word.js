const Letter = require("./letter");

function Word(word){
    this.arr = word.split('');
    this.letters = this.arr.map(x => new Letter(x));
    this.hasWon = () => this.letters.every(x => x.guessed === true);
}

Word.prototype = {
    print: function(){
        let toPrint = '';
        for (let x of this.letters){
            toPrint += x.display() + ' ';
        }
        console.log(toPrint);
    },
    checkLetter: function(guess){
        for (let x of this.letters){
            x.check(guess);
        }
    },
}

module.exports = Word;
