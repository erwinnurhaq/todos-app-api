const mysql = require("mysql");
const util = require('util')

const config = {
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'lollipop.',
  database: process.env.MYSQL_DBNAME || 'todo-list',
  port: 3306,
  multipleStatements: true
};
const pool = mysql.createPool(config)
const db = util.promisify(pool.query).bind(pool);

module.exports = db;
