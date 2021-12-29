const Types = require("sequelize");

const { Sequelize } = Types;

const DB = {
  HOST: process.env.MYSQL_HOST || "localhost",
  USER: process.env.MYSQL_USER || "root",
  PASSWORD: process.env.MYSQL_PASSWORD || "lollipop.",
  DATABASE: process.env.MYSQL_DBNAME || "todo-list",
  DIALECT: "mysql",
  PORT: 3306,
};

const sequelize = new Sequelize(DB.DATABASE, DB.USER, DB.PASSWORD, {
  host: DB.HOST,
  dialect: DB.DIALECT,
  port: DB.PORT,
  benchmark: true,
});

sequelize
  .authenticate()
  .then(() => console.log("DATABASE CONNECTED"))
  .catch((err) => console.error(err.message));

module.exports = {
  sequelize,
  Sequelize,
  Types,
}
