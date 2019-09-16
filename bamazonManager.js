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
    console.log("-----------------------------------------------------------");
    console.log("| WELCOME TO HARRY POTTER'S BAMAZON STORE MANAGER'S VIEW! |");
    console.log("-----------------------------------------------------------");

    whatDoYouWantToDo();
});

function whatDoYouWantToDo() {
    inquirer
        .prompt([{
            type: "list",
            message: "what do you want to do?",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "quit"],
            name: "what_to_do"
        }
        ])
        .then(function (resp) {
            switch (resp.what_to_do) {
                case "View Products for Sale":
                    loadProducts();
                case "View Low Inventory":
                    viewLowInventory();
                    break;
                case "Add to Inventory":
                    promptAddInventory();
                    break;
                case "Add New Product":
                    promtAddItem();
                    break;
                case "quit":
                    console.log('Thank you! Have a nice day!');
                    connection.end();
                    break;
                default:
                    // code block
                    loadProducts();
                    break;
            }

        });
}

function loadProducts() {
    // Selects all of the data from the MySQL products table
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) {
            console.log(err)
        }
        // Draw the table in the terminal using the response
        console.table(res);
        // Then prompt the customer for their choice of product, pass all the products to promptCustomerForItem
        whatDoYouWantToDo();
    });
};

function viewLowInventory() {
    connection.query("SELECT * FROM products WHERE stock_quantity < 5", function (err, res, fields) {
        console.table(res);
        whatDoYouWantToDo();
    })
};

function addInventory(count, iid) {
    connection.query("UPDATE products SET stock_quantity = stock_quantity + ? WHERE item_id = ?", [count, iid], function (err, res, field) {
        console.log("Success!");
        whatDoYouWantToDo();
    })
}
function promptAddInventory() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Please write ID number of item",
                name: "itemId"
            },
            {
                type: "input",
                message: "How many items do you want to add?",
                name: "count"
            }
        ]).then(answers => {
            addInventory(answers.count, answers.itemId);
        })
}

function promtAddItem(){
    inquirer
        .prompt([
            {
                type: "input",
                message: "What's name of the product?",
                name: "itemName"
            },
            {
                type: "input",
                message: "Please write ID of department that will control this item?",
                name: "departmentName"
            },
            {
                type: "input",
                message: "What's the quantity?",
                name: "quantity"
            },
            {
                type: "input",
                message: "How much is this product?",
                name: "price"
            }
        ]).then(answers => {
            addItem(answers.itemName, answers.departmentName, answers.quantity, answers.price);
        })
};

function addItem(name, department, quantity, price){
    connection.query("INSERT INTO products(product_name, department_id, price, stock_quantity) VALUES (?, ?, ?, ?)", [name, department, price, quantity], function(err, res, field){
        console.log("Success!");
        whatDoYouWantToDo();
    })
}