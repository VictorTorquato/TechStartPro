const express = require("express");

const ProductController = require('./Controllers/ProductFactory');
const CategoryController = require('./Controllers/CategoryController');
const Product_CategoryController = require('./Controllers/Product_CategoryController')

const routes = express.Router();

routes.get('/product', ProductController.index);
routes.post('/product/:category', ProductController.createProduct);
// routes.delete('/product/:id', ProductController.delete);

routes.get('/category', CategoryController.index);
routes.post('/category', CategoryController.create);
routes.delete('/category/:id', CategoryController.delete);

routes.get('/product_category', Product_CategoryController.index);

module.exports = routes;