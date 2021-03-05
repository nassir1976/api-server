'use strict';
 // this is the blueprint of data-collection.js======SCHEMA====  LIKE SCHEMA.SQL
const mongoose = require('mongoose');

const clothesSchema = mongoose.Schema({
  type: {type: String, required: true},
  name: {type: String, required: true}
});

const ClothesModel = mongoose.model('clothes', clothesSchema);

module.exports = ClothesModel;