const express = require("express");
const route = express.Router({mergeParams:true});
const review_model=require("../models/Review");
const CatchAsync = require("../utils/CatchAsync");
const ExpressError = require("../utils/ExpressErrors");
const Campground = require("../models/CampGround");
const review_schema = require("../reviewschema.js");
const joi = require("joi");

const joi_schema = require("../schema");
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
route.post(
  "/campgrounds/:id/reviews",
  r_validator,
  CatchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);

    const { range, message } = req.body;

    const review = new review_model({
      body: message,
      rating: range,
    });

    campground.reviews.push(review);
    await review.save();
    await campground.save();
   //adding a splash for a new review
   req.flash("success","you have successfully submitted your review")
    res.redirect(`/campgrounds/${req.params.id}`);
  })
);

//deleting the reviews:)

route.delete(
  "/campgrounds/:id/reviews/:reviewsId",
  CatchAsync(async (req, res) => {
    const { id, reviewsId } = req.params;
    const see = await Campground.findByIdAndUpdate(id, {
      $pull: { reviews: reviewsId },
    });
    const set = await review_model.findOneAndDelete(reviewsId);
//adding the flash
req.flash("success","Review removed");

    res.redirect(`/campgrounds/${id}`);
  })
);


module.exports=route;