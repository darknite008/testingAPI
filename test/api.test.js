const { expect } = require("chai");
const db = require("../model/api");
const { response } = require("../app");
const { Package, Category } = db.models;
const app = require("supertest")(require("../app"));

describe("Travel and Tourism", () => {
  let seed;
  beforeEach(async () => (seed = await db.syncAndSeed()));
  //Data Layer
  describe("Data Layer", () => {
    it("Should Add Packages", async () => {
      expect(seed.packages.Goa.name).to.equal("Goa");
      expect(seed.packages.Mustang.name).to.equal("Mustang");
      expect(seed.packages.Gosian.name).to.equal("Gosian");
    });
    it("Should add Categories value to Packages", () => {
      expect(seed.packages.Goa.categoryId).to.equal(seed.categories.catTrek.id);
    });
    //Package validation
    describe("Package validation", () => {
      it("Package Name is Required", () => {
        return Package.create({})
          .then(() => {
            throw "Pname";
          })
          .catch((ex) => expect(ex.errors[0].path).to.equal("name"));
      });
      it("Package name cannot be empty", () => {
        return Package.create({ name: "" })
          .then(() => {
            throw "Pname";
          })
          .catch((ex) => expect(ex.errors[0].path).to.equal("name"));
      });
    });

    describe("Hooks", () => {
      it("An empty categoryId will get set to null", async () => {
        const package = await Package.create({ name: "Toto", categoryId: "" });
        expect(package.categoryId).to.equal(null);
      });
    });

    //Package isExpensive
    // describe("Package isExpensive", () => {
    //   it("Package higher than 10 dollars is expensive"),
    //     () => {
    //       expect(Package.build({ suggestedPrice: 11 }).isExpensive).to.equal(
    //         true
    //       );
    //     };

    //   it("Package less than 10 dollars is not expensive"),
    //     () => {
    //       expect(Package.build({ suggestedPrice: 10 }).isExpensive).to.equal(
    //         false
    //       );
    //     };
    // });
  });

  //Welcome package

  describe("API", () => {
    describe("GET/api", () => {
      it("Should welcome the Travel Application", () => {
        return app.get("/api").expect(200);
      });
    });
    //get packages
    describe("GET/api/packages", () => {
      it("Should get the packages", () => {
        return app
          .get("/api/packages")
          .expect(200)
          .then((response) => {
            expect(response.body.length).to.equal(3);
          });
      });
    });
    //post packages
    describe("POST/api/packages", () => {
      it("Should create a package", () => {
        return app
          .post("/api/packages")
          .send({ name: "om", suggestedPrice: 8 })
          .expect(201)
          .then((response) => {
            //  expect(response.body.length).to.equal(3);
            expect(response.body.name).to.equal("om");
          });
      });
    });

    //put packages
    describe("PUT/api/packages", () => {
      it("Should update the package", () => {
        return app
          .put(`/api/packages/${seed.packages.Goa.id}`)
          .send({ name: "Germ", suggestedPrice: 5 })
          .expect(200)
          .then((response) => {
            //  expect(response.body.length).to.equal(3);
            expect(response.body.name).to.equal("Germ");
          });
      });
    });

    //delete packages
    describe("DELETE/api/packages", () => {
      it("Should delete the package", () => {
        return app
          .delete(`/api/packages/${seed.packages.Goa.id}`)
          .send({ name: "Germ", suggestedPrice: 5 })
          .expect(204);
      });
    });
  });
});
