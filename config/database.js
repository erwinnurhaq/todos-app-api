const mysql = require("mysql2");

const config = {
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'lollipop.',
  database: process.env.MYSQL_DBNAME || 'todo-list',
  port: 3306,
  connectionLimit: 100,
};
const db = mysql.createPool(config).promise();

module.exports = db;
