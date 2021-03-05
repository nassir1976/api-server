'use strict';
require('@code-fellows/supergoose');
const server = require('../src/server.js');
const supertest = require('supertest');
const { response } = require('express');
const request = supertest(server.server);


// ========== Server Tests==============

describe('web server tests', () => {

  describe('404 Test', () => {
    it('should pass 404 on a bad route', async () => {
      const response = await request.get('/test');
      expect(response.status).toEqual(404);
      expect(response.text).toEqual('not found')
    });
  });


  it('should pass 404 on a bad method', async () => {
    const response = await request.post('/food/test');

    expect(response.status).toEqual(404);
    expect(response.text).toEqual('not found');

  });
  // =========== test Clothes ==============
 let postid = ''
 let postid2 = ''
  // post......creat//
  it('Should Create a record using POST /clothes', async () => {

    const response = await request.post('/clothes').send({
      name: 'jeans',
      type: 'pant',
    });
    const response2 = await request.post('/clothes').send({
      name: 'Hiking Boots',
      type: 'Shoe',
    });
    // console.log(response.body)
    postid = response.body._id
    postid2= response2.body._id
    expect(response.status).toEqual(200);
    expect(response.body._id).toBeDefined();
    expect(response.body.name).toEqual('jeans');
    expect(response2.body.name).toEqual('Hiking Boots');
  });

  // get ...read//

  it('should Read a list of records using GET /clothes', async () => {
    const response = await request.get('/clothes');
// console.log(clo);

    expect(response.status).toEqual(200);
    expect(response.body[0]._id).toEqual(postid);
    expect(response.body[1]._id).toEqual(postid2);
  });
  //get by id ... read by id//


  it('should Read a record using GET /clothes', async () => {
   const cloth = await request.post('/clothes').send({

      name: 'jeans',
      type: 'pant',
    });
    const response = await request.get(`/clothes/${cloth.body._id}`);


    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('jeans');
  });

  //put ...update//
  it('should Update a record using PUT /clothes/:id', async () => {
    const cloth = await request.post('/clothes').send({
      name: 'jeans',
      type: 'pant',
    });
    const response = await request.put(`/clothes/${cloth.body._id}`).send({
      name: 'slicker',
      type: 'Raincoat',
    });
    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('slicker');
    expect(response.body.type).toEqual('Raincoat');
  });

// delete... destroy//
  it('should Destroy a record using DELETE - clothes', async () => {
    const cloth = await request.post('/clothes').send({
      name: 'jeans',
      type: 'pant',
    });
    const response = await request.delete(`/clothes/${cloth.body._id}`);
    expect(response.status).toEqual(204);
    // expect(response.body).toBeFalsy();
    
  });

//   it('should Destroy a record using DELETE - clothes', async () => {
//   await request.delete('/clothes/:_ID')
//  .then(response=>{
//   expect(response.status).toEqual(204);
//   expect(response.body).toBeFalsy();

//  })
//   })


  // ============ Food Tests =========
   // post......creat//
  let postID3=''
  let postID4=''
  it('Should Create a record using POST /food', async () => {
    const response = await request.post('/food').send({
      name: 'injera',
      type: 'ethio-cuisine',
    });
    const response2 = await request.post('/food').send({
      name: 'burger',
      type: 'fast food',
    });
    postID3 = response.body._id
    postID4 = response2.body._id

    expect(response.status).toEqual(200);
    expect(response.body._id).toBeTruthy();
    expect(response.body.name).toEqual('injera');
    expect(response2.body.name).toEqual('burger');
  });


 // get ...read//
  it('should Read a list of records using GET /food', async () => {
    const response = await request.get('/food');


    expect(response.status).toEqual(200);
    expect(response.body[0]._id).toEqual(postID3);
    expect(response.body[1]._id).toEqual(postID4);
  });


 // get ...read by id //
  it('should Read a record using GET by id /food', async () => {
    const foo =await request.post('/food').send({
    name: 'injera',
    type: 'ethio-cuisine',
    });
    const response = await request.get(`/food/${foo.body._id}`);
    // console.log(response.body)

    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('injera');
  });

//update food 
  it('should Update a record using PUT /food/:id', async () => {
     const foo = await request.post('/food').send({
      name: 'injera',
      type: 'ethio-cuisine',
    });
    const response = await request.put(`/food/${foo.body._id}`).send({
      name: 'Carbonara',
      type: 'Italian pasta dish',
    });

    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('Carbonara');
    expect(response.body.type).toEqual('Italian pasta dish');
  });

//delete food
  it('should Destroy a record using DELETE - food', async () => {
    const foo = await request.post('/food').send({
      name: 'injera',
      type: 'ethio-cuisine',
    });
    const response = await request.delete(`/food/${foo.body._id}`);

    expect(response.status).toEqual(204);
  
  });

});