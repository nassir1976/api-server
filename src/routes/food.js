'use strict';

const express = require('express');
// const FoodModel = require('../models/food.js');
const ModelCollection = require('../models/data-collection-class.js')
const FoodModel = require('../models/food.js');
const validator = require('../middleware/validator.js')

// here, we instantiate the new things model
const food = new ModelCollection(FoodModel);


const  router = express.Router();

// routes
router.get('/food', getFood); // 1: hit the route -> REST
router.get('/food/:id',validator, getOneFood);
router.post('/food', createFood);
router.put('/food/:id', validator, updateFood);
router.delete('/food/:id',validator, deleteFood);

 async function getFood(request, response) {
  // 2: get all items from the database -> CRUD
  let all =  await food.get();
  // 3: send those items back to the user -> RESPONSE
  response.status(200).json(all);
}

 async function getOneFood(request, response) {
  let id = (request.params.id);
  console.log(id)
  let foodObject =  await food.get(id);
  response.status(200).json(foodObject);
}

async function createFood(request, response) {
  let obj = request.body;
  let newFood = await food.create(obj);
  response.status(200).json(newFood); 
}

// localhost:3333/things/1
async function updateFood(request, response) {
  let id = (request.params.id);
  let content = request.body;
  let updated = await food.update(id, content);
  response.status(200).json(updated);
}

async function deleteFood(request, response) {
  let id = (request.params.id);
  let deleted = await food.delete(id);
  response.status(204).send('food deleted');
}

module.exports = router;