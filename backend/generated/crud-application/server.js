const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const db = require('./db');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname));
const Restaurant = require('./model');
app.get('/api/restaurants', async (req, res) => {
try {
let restaurants = await Restaurant.find();
res.send(restaurants);
} catch (error) {
res.status(500).send(error);
}
});
app.post('/api/restaurants', async (req, res) => {
let restaurant = new Restaurant(req.body);
try {
await restaurant.save();
res.send(restaurant);
} catch (error) {
res.status(500).send(error);
}
});
app.listen(3000, () => console.log('Server started on port 3000'));