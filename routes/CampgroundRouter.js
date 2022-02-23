const express = require("express");
const route = express.Router();
const CatchAsync = require("../utils/CatchAsync");
const ExpressError = require("../utils/ExpressErrors");
const Campground = require("../models/CampGround");
const joi = require("joi");
const isloggedin = require("../middleware/middleware");
const joi_schema = require("../schema");
const {isAuth}=require("../middleware/isAuth")
const passport = require("passport");
const validator=require("../middleware/validator")
const {index,newCampground,makeCamp,showpage,editpage,updateCamp,deleteop}=require("../controller/campgrounds.js");
//for the home route
route.get("/", (req, res) => {
  res.redirect("/campgrounds");
});
//for the index route
route.get("/campgrounds",CatchAsync(index));

//adding a new campground

route.get("/campgrounds/new", isloggedin,CatchAsync(newCampground) );

//showing the campgrounds

route.get("/campgrounds/:id",CatchAsync(showpage));


/*handling the post request*/

route.post(
  "/campgrounds",
  isloggedin,
  validator,
  CatchAsync(makeCamp)
);
route.get(
  "/campgrounds/:id/edit",
  isloggedin,
  isAuth,
  CatchAsync(editpage)
);
route.put("/campgrounds/:id/edit", validator, CatchAsync(updateCamp));

//deleting the campground
route.delete(
  "/campgrounds/:id/delete",
  isloggedin,
  isAuth,
  CatchAsync(deleteop));


module.exports = route;
