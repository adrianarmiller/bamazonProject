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


    queryProducts();
});

function queryProducts() {
    var query = connection.query("SELECT * FROM products", function (err, res) {
       for(let i = 0; i < res.length; i++) {
           console.log("Product ID: " + res[i].item_id + " - Product name: " + res[i].product_name + " - Department Name: " + res[i].department_name + " - Price: $" + res[i].price + " - Stock Quantity: " + res[i].stock_quantity);
       }
    });

    customerRequest();
};


function customerRequest() {

    inquirer
        .prompt([
            {
                name: "id",
                type: "input",
                message: "What is the ID of the product you would like to buy?"
            },
            {
                name: "amount",
                type: "input",
                message: "Enter the quantity you would like to purchase."
            }
        ])
        .then(function(answer) {
           updateQuantity(parseInt(answer.id), parseInt(answer.amount));
        });
        
}


function checkQuantity(desiredID, desiredQuantity) {
    connection.query("SELECT stock_quantity, price FROM products WHERE item_id = ?", [desiredID], function (err, res) {
       let availableQuantity = res[0].stock_quantity;
       let price = res[0].price;

       if(availableQuantity >= desiredQuantity){
            updateQuantity(desiredID, desiredQuantity, availableQuantity, price);
       } else {
           console.log("Insufficient quantity");
           connection.end();
       }
        
    });
}

function updateQuantity(desiredID, desiredQuantity, availableQuantity, price){
    let updatedQuantity = availableQuantity - desiredQuantity;
    let paidAmount = desiredQuantity * price;

    connection.query(
        "UPDATE products SET ? WHERE ?",
        [
            {
                stock_quantity: updatedQuantity
            }, 
            {
                item_id: desiredID
            }
        ],
        function(err, res) {
           console.log(`Item bought! You paid ${paidAmount} dollars.`);
           //unsure why paidAmount shows as NaN, price is an integer and desiredQuantity was parsed to integer earlier in code?
           connection.end();
        }

    );

}





