const express = require('express');
const routes = require('./routes');
const figlet = require('figlet');

var inquirer = require('inquirer');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const app = express();

app.use(express.json());
app.use(routes);

app.listen(3333);

let xhr = new XMLHttpRequest();


// xhr.open('GET', "http://localhost:3333/category", true);
// xhr.send();

// xhr.onreadystatechange = processRequest;

// function processRequest(e) {
//     if (xhr.readyState == 4 && xhr.status == 200) {
//         let response = xhr.responseText;
//         console.log(response);
//     }
// }

console.clear();

console.log(figlet.textSync('API', { horizontalLayout: 'full' }));

inquirer
  .prompt([
    /* Pass your questions in here */
    {
        name: 'option',
        type: 'input',
        message: 'Enter the option:',
    }
  ])
  .then(answers => {
    // Use user feedback for... whatever!!
    console.log(answers);
  })
  .catch(error => {
    if(error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else when wrong
    }
  });