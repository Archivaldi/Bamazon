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
  console.log("--------------------------------------------");
  console.log("| WELCOME TO HARRY POTTER'S BAMAZON STORE! |");
  console.log("--------------------------------------------");

  promptUserEntry();
});
function loadProducts() {
  // Selects all of the data from the MySQL products table
  connection.query("SELECT item_id AS ID, product_name AS Product, price AS Price, stock_quantity AS Quantity, department_name, products.department_id FROM (products) LEFT JOIN departments USING (department_id)", function (err, res) {
    if (err) {
      console.log(err)
    }
    // Draw the table in the terminal using the response
    console.table(res);
    // Then prompt the customer for their choice of product, pass all the products to promptCustomerForItem
    promptUser();
  });

  function updateQuantity(count, iid) {
    connection.query("UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?", [count, iid], function (err, res, field) {
      promptUserEntry();

    });
  };

  function updateSales(count, iid){
    connection.query("UPDATE products SET product_sales = price * ? WHERE item_id = ?", [count, iid], function (err, res, fields){
    })
  };

  function checkQuantity(count, iid) {
    connection.query("SELECT * FROM products WHERE item_id = ?", [iid], function (err, res, fields) {

      if (parseInt(res[0].stock_quantity) >= count) {
        updateSales(count, iid);
        console.log("-----------------------------------------------------------");
        console.log("Success! You bougth " + count + " " + res[0].product_name + "'s. " + "The total is $" +  count * res[0].price);
        console.log("-----------------------------------------------------------");
        updateQuantity(count, iid);
      } else {
        console.log("Insufficient quantity");
        promptUserEntry();
      }
    })
  }


  function promptUser() {
    inquirer
      .prompt([
        {
          message: "Please, insert ID of item you would like to buy",
          type: "input",
          name: "ID"
        },
        {
          message: "How many items would you like to purchase?",
          type: "input",
          name: "count"
        }
      ])
      .then(answers => {
        checkQuantity(answers.count, answers.ID);
      });
  }
}

function promptUserEntry(){
  inquirer
    .prompt([
      {
        type: "list",
        message: "What do you want to do?",
        choices: ["Buy a product", "quit"],
        name: "what_to_do"
      }
    ]).then(resp => {
      switch (resp.what_to_do){
        case "Buy a product":
            loadProducts();
            break;
        case "quit":
          console.log("Thank you! Have a nice day!");
          connection.end();
      }
    })
}
