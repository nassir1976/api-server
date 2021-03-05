'use strict'
module.exports = function(req,res , next){
  if (req.params.id){

    console.log(req.params.id)
    next()
  }else{
    next('invalid id')
  }
};