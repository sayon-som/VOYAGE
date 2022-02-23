const review_schema=require('../reviewschema');
const ExpressError=require("../utils/ExpressErrors");
const r_validator = (req, res, next) => {
  //validating the data being passed

  const { error } = review_schema.validate(req.body.review);
  if (error) {
    const msg = error.details.map((e) => e.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};
module.exports=r_validator;