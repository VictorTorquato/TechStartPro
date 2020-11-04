const express = require("express");

const routes = express.Router();

routes.get('/products', (request, response) => {
    const body = request.body;

    return response.json({
        nome: 'Mesa',
        categorias: 'Móveis'
    });
});

module.exports = routes;