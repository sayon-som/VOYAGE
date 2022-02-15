const joi = require('joi');

const joi_schema = joi
  .object({
    title: joi.string().required(),
    price: joi.number().required().min(0),
    image: joi.string().required(),
    description: joi.string().required(),
    location: joi.string().required(),
  });

  
  module.exports=joi_schema;



