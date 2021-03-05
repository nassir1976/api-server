'use strict';



const server = require('./src/server.js');
// ==========connecting to our DB===========
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000;
const MONGODB_URI = 'mongodb://localhost:27017/api-server'; // api-server is the DB name
const options = { useNewUrlParser: true, useUnifiedTopology: true }; // always pass in these options

mongoose.connect(MONGODB_URI, options);

server.start(PORT);
 




