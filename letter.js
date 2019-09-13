function Letter(char){
    this.letter = char;
    this.guessed = false;
}
 
Letter.prototype = {
    display: function(){
        return this.guessed ? this.letter : '_';
    },
    check: function(guess){
        if (this.letter === guess.toLowerCase() && !this.guessed){
            this.guessed = true;
            return true;
        } else {
            return false;
        }
    }
}

module.exports = Letter;
