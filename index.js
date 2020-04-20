"use strict";
exports.__esModule = true;
var Joi = require('joi');
var express = require('express');
var app = express();
app.use(express.json());
var products = [
    { id: 1, name: 'products1' },
    { id: 2, name: 'products2' },
    { id: 3, name: 'products3' }
];
app.get('/', function (req, res) {
    res.send('Hello World');
});
app.get('/api/products', function (req, res) {
    res.send([1, 2, 3]);
});
app.post('/api/products', function (req, res) {
    var error = validateProduct(req.body).error;
    if (error)
        return res.status(400).send(error.details[0].message);
    var product = {
        id: products.length + 1,
        name: req.body.name
    };
    products.push(product);
    res.send(product);
});
app.put('/api/products/:id', function (req, res) {
    var product = products.find(function (c) { return c.id === parseInt(req.params.id); });
    if (!product)
        return res.status(404).send('The product with the given id was not found...');
    var error = validateProduct(req.body).error;
    if (error)
        return res.status(400).send(error.details[0].message);
    product.name = req.body.name;
    res.send(product);
});
function validateProduct(product) {
    var schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(product, schema);
}
app["delete"]('/api/products/:id', function (req, res) {
    var product = products.find(function (c) { return c.id === parseInt(req.params.id); });
    if (!product)
        return res.status(404).send('The product with the given id was not found...');
    var index = products.indexOf(product);
    products.splice(index, 1);
    res.send(product);
});
app.get('/api/products/:id', function (req, res) {
    var product = products.find(function (c) { return c.id === parseInt(req.params.id); });
    if (!product)
        return res.status(404).send('The product with the given id was not found...');
    res.send(product);
});
var port = process.env.PORT || 3000;
app.listen(port, function () { return console.log("Listening on port " + port + "..."); });
