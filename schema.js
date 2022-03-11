const joi = require('joi');

const joi_schema = joi
  .object({
    title: joi.string().required(),
    price: joi.number().required().min(0),
  
    description: joi.string().required(),
    location: joi.string().required(),
    deleteimages:joi.array()
  });

  
  module.exports=joi_schema;



