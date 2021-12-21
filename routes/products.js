const express = require("express");
const Product = require("../models/products");
const router = express.Router();

router
  .route("/")
  .get((req, res, next) => {
    Product.find({ author: req.user._id })
      .populate("category")
      .then((product) => {
        res.json(product);
      })
      .catch((err) => next(err));
  })
  .post((req, res, next) => {
    req.body.author = req.user._id;
    Product.create(req.body)
      .then((product) => {
        res.json(product);
      })
      .catch(next);
  })
  .delete((req, res, next) => {
    Product.deleteMany({ author: req.user._id })
      .then((status) => {
        res.json(status);
      })
      .catch(next);
  });

router
  .route("/:id")
  .get((req, res, next) => {
    Product.findById(req.params.id)
      .populate("category", "name")
      .then((product) => {
        res.json(product);
      })
      .catch(next);
  })
  .put((req, res, next) => {
    Product.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
      .then((product) => {
        res.json(product);
      })
      .catch(next);
  })
  .delete((req, res, next) => {
    Product.findByIdAndDelete(req.params.id)
      .then((product) => {
        res.json(product);
      })
      .catch(next);
  });

router
  .route("/:id/products")
  .get((req, res, next) => {
    Product.findById(req.params.id)
      .then((product) => {
        res.json(product);
      })
      .catch(next);
  })
  .post((req, res, next) => {
    Product.findById(req.params.id)
      .then((product) => {
        res.json(product);
      })
      .catch(next);
  })
  .delete((req, res, next) => {
    Product.findById(req.params.id)
      .then((task) => {
        res.json(task);
      })
      .catch(next);
  });

module.exports = router;
