const Sequelize = require("sequelize");
const { STRING, DECIMAL } = Sequelize;
const conn = require("../model/db");
const Package = require("../model/package");
const Category = require("../model/category");

Package.belongsTo(Category);

const syncAndSeed = async () => {
  await conn.sync({ force: true });

  const categories = [
    { name: "Trek" },
    { name: "Climbing" },
    { name: "Tours" },
  ];
  const [catTrek, catClimbing, catTours] = await Promise.all(
    categories.map((category) => Category.create(category))
  );

  const packages = [
    { name: "Goa", categoryId: catTrek.id, suggestedPrice: 11 },
    { name: "Mustang", categoryId: catClimbing.id, suggestedPrice: 10 },
    { name: "Gosian", categoryId: catTours.id, suggestedPrice: 9 },
  ];
  const [Goa, Mustang, Gosian] = await Promise.all(
    packages.map((package) => Package.create(package))
  );
  return {
    packages: {
      Goa,
      Mustang,
      Gosian,
    },
    categories: {
      catTrek,
      catClimbing,
      catTours,
    },
  };
};

module.exports = {
  syncAndSeed,
  models: { Package, Category },
};
