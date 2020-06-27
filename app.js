const express = require("express");
const app = express();
const db = require("./model/api");

const { Package, Category } = db.models;
module.exports = app;
app.use(express.json());
app.get("/api", (req, res) => {
  res.json({ message: "Welcome to Travel Application." });
});

app.get("/api/packages", (req, res, next) => {
  Package.findAll()
    .then((packages) => res.send(packages))
    .catch(next);
});
app.post("/api/packages", (req, res, next) => {
  Package.create(req.body)
    .then((package) => res.status(201).send(package))
    .catch(next);
});

app.put("/api/packages/:id", (req, res, next) => {
  Package.findByPk(req.params.id)
    .then((package) => package.update(req.body))
    .then((package) => res.send(package))
    .catch(next);
});
app.delete("/api/packages/:id", (req, res, next) => {
  Package.findByPk(req.params.id)
    .then((package) => package.destroy())
    .then(() => res.sendStatus(204))
    .catch(next);
});
