const inquirer = require('inquirer');

const questions = {
  guess: function () {
    return inquirer
      .prompt({
        type: 'input',
        message: 'Guess a letter!',
        name: 'guess'
      })
      .then(res => { return res; });
  },
  confirmPlay: function () {
    return inquirer
      .prompt({
        type: 'confirm',
        message: 'Play Again?',
        name: 'play',
        default: true
      })
      .then(res => { return res; });
  }
};

module.exports = questions;
