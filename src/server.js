'use strict';
// if applicable, 1st party dependencies
// 3rd party dependencies
const express = require('express');
const app = express();

// internal modules
// ./ -> considered a relative path
// __dirname -> point us to an absolute path
const routeNotFound = require('./error-handlers/404.js');
const errorsFound = require('./error-handlers/500.js');
const logger = require('./middleware/logger.js');
const clothesRouter = require('./routes/clothes.js');
const foodRouter = require('./routes/food.js');

// internal constants
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(logger);

app.use(clothesRouter); // now your routes are modular
app.use(foodRouter)
// run this for everything
app.use('*', routeNotFound);
// error handling middleware is always at the bottom of the
app.use(errorsFound);

module.exports = {
  server: app,
  start: (port) => {
    app.listen(port, () => {
      console.log(`listening on ${port}`);
    });
  }
}
