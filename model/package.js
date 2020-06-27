const conn = require("../model/db");
const Sequelize = require("sequelize");
const { STRING, DECIMAL } = Sequelize;
const Package = conn.define(
  "package",
  {
    name: {
      type: STRING,
      allowNull: false,
      validate: { notEmpty: true },
    },
    suggestedPrice: {
      type: DECIMAL,
      defaulValue: 5,
    },
  },
  {
    hooks: {
      beforeSave: function (package) {
        //console.log(package);
        if (package.categoryId === "") {
          package.categoryId = null;
        }
      },
    },
  }
);
module.exports = Package;
