//add dotenv package for hiding private data
require("dotenv").config();

const keys = require("./keys.js");

const inquirer = require("inquirer");

var mysql = require('mysql');

//hiding private data 
var connection = mysql.createConnection(keys.data);

// Creates the connection with the server and loads the product data upon a successful connection
connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
  }
  console.log("------------------------------------------------------------");
  console.log("| WELCOME TO HARRY POTTER'S BAMAZON STORE SUPERVISOR VIEW! |");
  console.log("------------------------------------------------------------");
  whatDoYouWantToDo();
});

function whatDoYouWantToDo() {
    inquirer
        .prompt([
            {
            type: "list",
            message: "what do you want to do?",
            choices: ["View Product Sales by Department", "Create New Department", "quit"],
            name: "what_to_do"
            }
        ])
        .then(function (resp) {
            switch (resp.what_to_do) {
                case "View Product Sales by Department":
                    productSales();
                case "Create New Department":
                    promptNewDep();
                    break;
                case "quit":
                    console.log('Thank you! Have a nice day!');
                    connection.end();
                    break;
                default:
                    productSales();
                    break;
            }

        });
};

function productSales() {
    connection.query("SELECT department_id, department_name,over_head_costs, SUM(product_sales) - over_head_costs AS total_profit,  SUM(product_sales) AS product_sales FROM departments LEFT JOIN products USING (department_id) GROUP BY department_id, department_name, over_head_costs", function (err, res) {
        console.table(res);
        whatDoYouWantToDo();
    });
};

function promptNewDep() {
    console.log("ill be the new function");
}