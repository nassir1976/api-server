'use strict';

const express = require('express');
// const ClothesModels = require('../models/cloth.js');
const ModelCollection = require('../models/data-collection-class.js')
const ClothesModels = require('../models/clothes.js')
const validator = require('../middleware/validator.js')
// here, we instantiate the new things model
const clothes = new ModelCollection (ClothesModels);



const router = express.Router();

// routes
router.get('/clothes', getClothes); // 1: hit the route -> REST
router.get('/clothes/:id', validator, getOneCloth);
router.post('/clothes', createCloth);
router.put('/clothes/:id',validator, updateCloth);
router.delete('/clothes/:id',validator, deleteCloth);

async function getClothes(request, response) {
  // 2: get all items from the database -> CRUD
  let all = await clothes.get();
  // 3: send those items back to the user -> RESPONSE
  response.status(200).json(all);
}

async function getOneCloth(request, response) {
  let id = (request.params.id);
  let cloth = await clothes.get(id);
  response.status(200).json(cloth);
}

async function createCloth(request, response) {
  let obj = request.body;
  let newCloth = await clothes.create(obj);
  response.status(200).json(newCloth); 
}

// localhost:3333/things/1
async function updateCloth(request, response) {
  let id = (request.params.id);
  let content = request.body;
  let updated = await clothes.update(id, content);
  response.status(200).json(updated);
}

async function deleteCloth(request, response) {
  let id = (request.params.id);
  let deleted = await clothes.delete(id);
  response.status(204).send('deleted');
}

module.exports = router;