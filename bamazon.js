//add dotenv package for hiding private data
require("dotenv").config();
const keys = require("./keys.js");

var mysql      = require('mysql');
var connection = mysql.createConnection(keys.data);
console.log(keys.data);

//connection.connect();