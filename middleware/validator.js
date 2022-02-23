const joi_schema = require("../schema");
const ExpressError=require("../utils/ExpressErrors");

const validator = (req, res, next) => {
  //validating the data being passed

  const { error } = joi_schema.validate(req.body);
  if (error) {
    const msg = error.details.map((e) => e.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};
module.exports=validator;