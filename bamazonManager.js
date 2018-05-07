var mysql = require("mysql");
var inquirer = require("inquirer");
let savedIndex = 0;

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    user:"root",
    password: "",
    database: "bamazon"
});

connection.connect(function(err) {
    if(err) throw err;
    
    console.log(`Connected as ID: ${connection.threadId}`);


});