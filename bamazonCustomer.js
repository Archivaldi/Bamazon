//add dotenv package for hiding private data
require("dotenv").config();
const keys = require("./keys.js");

const inquirer = require("inquirer");

var mysql      = require('mysql');
var connection = mysql.createConnection(keys.data);

connection.connect(function(err){
    if (err) {
        console.log(err)
    };
    console.log("connect");
});


 connection.query('SELECT * FROM products', function (error, results, fields) {
     console.log('The solution is: ', results[0]);
   });

inquirer
  .prompt([
    {
        message: "Please, insert ID of item that you would like to purchase",
        type: "input",
        name: "ID"
    },
    {
        message: "How many items would you like to purchase?",
        type: "input",
        name: "count"
    }
  ])
  .then( answers => {
        console.log(parseInt(answers.ID));
        console.log(parseInt(answers.count));
  });
  
connection.end();