// create a mysql database table command to store the following JSON information as stock sectors
// "Energy", "Materials", "Industrials", "Consumer Discretionary", "Consumer Staples", "Health Care", "Financials", "Information Technology", "Telecommunication Services", "Utilities", "Real Estate"
const table = "CREATE TABLE IF NOT EXISTS stock_sectors (
id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
sector VARCHAR(100) NOT NULL,
)";

// node js code snippet to create above table in mysql database
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost
    user: 'root',  
    password: 'password',
    database: 'stock_sectors'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
  const sql =  table;
  connection.query(sql, (err, result) => {
    if (err) throw err;
    console.log("Table created");
  });
});

// Design the tables schema using mysql to store stock sectors all vendors like money control, google, yahoo finance api?