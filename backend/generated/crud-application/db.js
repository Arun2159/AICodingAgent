const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/restaurantDB', {useNewUrlParser: true, useUnifiedTopology: true}, () => {
console.log('connected to the database');
});