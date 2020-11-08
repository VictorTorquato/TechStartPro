const express = require("express");

const ProductController = require('./Controllers/ProductFactory');
const CategoryController = require('./Controllers/CategoryController');
const Product_CategoryController = require('./Controllers/Product_CategoryController')

const routes = express.Router();

routes.get('/product/:sortCommand', ProductController.index);
routes.post('/product/:category', ProductController.createProduct);
routes.delete('/product/:id', ProductController.delete);
routes.put('/product/:newCategories', ProductController.update);

routes.get('/category', CategoryController.index);
routes.get('/category/:categoryId', CategoryController.indexProducts);
routes.post('/category', CategoryController.create);
routes.post('/category/scv/:file', CategoryController.createBySCV);
routes.delete('/category/:id', CategoryController.delete);

routes.get('/product_category', Product_CategoryController.index);

module.exports = routes;