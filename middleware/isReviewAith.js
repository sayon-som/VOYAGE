const passport = require("passport");

const CampGround = require("../models/CampGround");
const Review=require('../models/Review');
const isAuth = async (req, res, next) => {
    const { id, reviewsId } = req.params;
  const data = await Review.findById(req.params.reviewsId);

  if (!data.author.equals(req.user._id)) {
    req.flash("error", "You do not have the authorization to this area");
    return res.redirect("/campgrounds");
  }
  next();
};
module.exports = isAuth;
