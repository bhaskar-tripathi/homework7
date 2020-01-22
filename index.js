var genHTML = require("./generateHTML");
var inquirer = require("inquirer");
var axios = require("axios");

const questions = ["Whats your github ID?",
        "Color of your profile?"  
];

inquirer
  .prompt([
    {
      type: "input",
      message: questions[0],
      name: "username"
    },
    {
      type: "input",
      message: questions[1],
      name: "password"
    },
  ])
  .then(function(response) {

    
  });


function writeToFile(fileName, data) {
 
}

function init() {
}

init();
