const joi= require('joi');
const review_schema = joi.object({
  body:joi.string().required(),
  rating:joi.number().integer().required().min(1).max(10)
});
module.exports = review_schema;


