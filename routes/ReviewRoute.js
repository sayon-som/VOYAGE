const express = require("express");
const route = express.Router({mergeParams:true});
const review_model=require("../models/Review");
const CatchAsync = require("../utils/CatchAsync");
const ExpressError = require("../utils/ExpressErrors");
const Campground = require("../models/CampGround");
const review_schema = require("../reviewschema.js");
const joi = require("joi");
const isloggedin=require("../middleware/middleware");
const r_validator=require("../middleware/validatorreview");
const joi_schema = require("../schema");
const isAuth=require("../middleware/isAuth")
const isReviewAith=require("../middleware/isReviewAith");
const {createReview,deletereview}=require("../controller/Review");
//creating the reviews

route.post(
  "/campgrounds/:id/reviews",
  r_validator,
  isloggedin,
  
  CatchAsync(createReview)
);

//deleting the reviews ;)

route.delete(
  "/campgrounds/:id/reviews/:reviewsId",isloggedin,isReviewAith,
  CatchAsync(deletereview)
);


module.exports=route;