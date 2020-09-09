const express = require("express");

const Warehouse = require("../models/warehouse");

const router = express.Router();

router
  .route("/")
  .get((req, res) => {
    Warehouse.where(req.query)
      .fetchAll({ withRelated: ["inventories"] })
      .then(warehouses => {
        res.status(200).json(warehouses);
      });
  })
  .post((req, res) => {
    new Warehouse({
      name: req.body.name,
      position: req.body.position,
      manager: req.body.manager,
      address: req.body.address,
      phone: req.body.phone,
      email: req.body.email,
      categories: JSON.stringify(req.body.categories)
    })
      .save()
      .then(newWarehouse => {
        res.status(201).json({ newWarehouse });
      });
  });

router
  .route("/:id")
  .get((req, res) => {
    Warehouse.where(req.params)
      .fetch({ withRelated: ["inventories"] })
      .then(warehouse => {
        res.status(200).json(warehouse);
      });
  })
  .put((req, res) => {
    Warehouse.where("id", req.params.id)
      .fetch()
      .then(warehouse => {
        warehouse
          .save({
            name: req.body.name ? req.body.name : warehouse.name,
            position: req.body.position
              ? req.body.position
              : warehouse.position,
            manager: req.body.manager ? req.body.manager : warehouse.manager,
            address: req.body.address ? req.body.address : warehouse.address,
            phone: req.body.phone ? req.body.phone : warehouse.phone,
            email: req.body.email ? req.body.email : warehouse.email,
            categories: JSON.stringify(req.body.categories)
              ? JSON.stringify(req.body.categories)
              : warehouse.categories
          })
          .then(updatedWarehouse => {
            res.status(200).json({ updatedWarehouse });
          });
      });
  })
  .delete((req, res) => {
    Warehouse.where("id", req.params.id)
      .destroy()
      .then(deletedWarehouse => {
        res.status(200).json({ deletedWarehouse });
      });
  });

module.exports = router;
