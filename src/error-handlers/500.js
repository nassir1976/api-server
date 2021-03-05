'use strict';

function handleError (err, req, res, next){
  res.status(500).send( 'broke for some reason');
}

module.exports = handleError;