const inquirer = require("inquirer");

function Letter(char){
    this.letter = char;
    this.guessed = false;
}

Letter.prototype = {
    display: function(){
        return this.guessed ? this.letter : '_';
    },
    check: function(guess){
        if (this.letter === guess && !this.guessed){
            this.guessed = true;
        }
    }
}

function guess(){
    return inquirer
    .prompt({
        type: "input",
        message: "Guess a letter!",
        name: "letterGuess"
      })
      .then(res => {return res});
}

//testing
function init(){
    let newLetter = new Letter('m');
    console.log(newLetter.display());
    newLetter.check('m');
    console.log('--------------------');
    console.log(newLetter.display());
}

init();


module.exports = Letter;
