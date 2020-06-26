const Sequelize = require("sequelize");
//const { STRING, UUID, UUIDV4 } = require("sequelize");
const { STRING, UUID, UUIDV4, DECIMAL, VIRTUAL } = Sequelize;

const conn = new Sequelize(
  process.env.DATABASE_URL ||
    "postgresql://postgres:password@localhost:5432/testing",
  { logging: false }
);
const Package = conn.define(
  "package",
  {
    //   id: {
    //     primaryKey: true,
    //     type: UUID,
    //     defaulValue: UUIDV4,
    //   },
    name: {
      type: STRING,
      allowNull: false,
      validate: { notEmpty: true },
    },
    suggestedPrice: {
      type: DECIMAL,
      defaulValue: 5,
    },
    //   isExpensive: {
    //     type: VIRTUAL,
    //     get: function () {
    //       return this.suggestedPrice > 10 ? true : false;
    //     },
    //   },
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

const Category = conn.define("category", {
  //   id: {
  //     primaryKey: true,
  //     type: UUID,
  //     defaulValue: UUIDV4,
  //   },
  name: STRING,
});

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
