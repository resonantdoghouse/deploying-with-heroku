const express = require('express');
const Inventory = require('../models/inventory');
const Warehouse = require('../models/warehouse');
const router = express.Router();

router
  .route('/')
  .get((req, res) => {
    Inventory.where(req.query)
      .fetchAll({ withRelated: ['warehouse'] })
      .then((inventories) => {
        res.status(200).json({ inventories });
      });
  })
  .post((req, res) => {
    Warehouse.where('id', req.body.warehouseId)
      .fetch()
      .then((warehouse) => console.log('Warehouse found'))
      .catch((warehouse) => {
        res.status(404).json({ error: 'Please provide valid warehouse id' });
      });
    new Inventory({
      name: req.body.name,
      description: req.body.description,
      warehouse_id: req.body.warehouseId,
      quantity: req.body.quantity,
      status: req.body.status,
    })
      .save()
      .then((newInventory) => {
        res.status(201).json({ newInventory });
      });
  });

router
  .route('/:id')
  .get((req, res) => {
    Inventory.where(req.params)
      .fetch({ withRelated: ['warehouse'] })
      .then((inventory) => {
        res.status(200).json({ inventory });
      });
  })
  .put((req, res) => {
    if (req.body.warehouseId) {
      Warehouse.where('id', req.body.warehouseId)
        .fetch()
        .then((warehouse) => console.log('Warehouse found'))
        .catch((warehouse) => {
          res.status(404).json({ error: 'Please provide valid warehouse id' });
        });
    }

    Inventory.where('id', req.params.id)
      .fetch()
      .then((inventory) => {
        inventory
          .save({
            name: req.body.name ? req.body.name : inventory.name,
            description: req.body.description
              ? req.body.description
              : inventory.description,
            warehouse_id: req.body.warehouseId
              ? req.body.warehouseId
              : inventory.warehouse_id,
            quantity: req.body.quantity
              ? req.body.quantity
              : inventory.quantity,
            status: req.body.status ? req.body.status : inventory.status,
          })
          .then((updatedInventory) => {
            res.status(200).json({ updatedInventory });
          });
      });
  })
  .delete((req, res) => {
    Inventory.where('id', req.params.id)
      .destroy()
      .then((deletedInventory) => {
        res.status(200).json({ deletedInventory });
      });
  });

module.exports = router;
