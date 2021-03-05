'use strict';

const mongoose = require('mongoose');

const foodSchema = mongoose.Schema({
  type: {type: String, required: true},
  name: {type: String, required: true}
});

const FoodModel = mongoose.model('food', foodSchema);

module.exports = FoodModel;