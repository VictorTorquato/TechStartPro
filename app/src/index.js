const express = require('express');
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(routes);

app.listen(3333);

// console.log('Select the categories of this product in the following model: id1 id2 id3 ...\nAvailable categories:\n');

// console.log(await connection('category').select('*'));

//var readline = require('readline');

//var reader = readline.createInterface({
    //input: process.stdin,
    //output: process.stdout
//});

// reader.question("\nCategories: ", await function(answer) {
//     categories = answer;
//     console.log(categories);
//     reader.close();
// });