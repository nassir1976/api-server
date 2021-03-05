'use strict';

require('@code-fellows/supergoose');
const ModelCollection = require('../src/models/data-collection-class.js');
const FoodModel = require('../src/models/food.js');

const food = new ModelCollection(FoodModel);

describe('testing the model controller', () => {
  it ('should be able to create a valid model', async () => {

    const newFood = await food.create({name: 'injera', type:'ethio-cuisine'});

    expect(newFood.name).toEqual('injera');
  });
  
});