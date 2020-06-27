const Sequelize = require("sequelize");
const conn = new Sequelize(
  process.env.DATABASE_URL ||
    "postgresql://postgres:postgres@localhost:5432/testing",
  { logging: false }
);
module.exports = conn;
