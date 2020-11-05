const express = require("express");

const ProductController = require('./Controllers/ProductController');

const routes = express.Router();

routes.get('/product', ProductController.index);
routes.post('/product', ProductController.create);
routes.delete('/product/:id', ProductController.delete);

module.exports = routes;