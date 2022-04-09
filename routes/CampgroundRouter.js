const express = require("express");
const route = express.Router();
const CatchAsync = require("../utils/CatchAsync");
const ExpressError = require("../utils/ExpressErrors");
const Campground = require("../models/CampGround");
const joi = require("joi");
const isloggedin = require("../middleware/middleware");
const joi_schema = require("../schema");
const { isAuth } = require("../middleware/isAuth");
const passport = require("passport");
const validator = require("../middleware/validator");
const {
  index,
  newCampground,
  makeCamp,
  showpage,
  editpage,
  updateCamp,
  deleteop,
} = require("../controller/Campground.js");
const multer = require("multer");
const { storage } = require("../cloudinary");
// const upload = multer({ dest: "uploads/" });
const upload = multer({ storage });

//for the home route
route.get("/", (req, res) => {
  res.redirect("/places");
});
//for the index route
route.get("/places", CatchAsync(index));

//adding a new campground

route.get("/places/new", isloggedin, CatchAsync(newCampground));

//showing the campgrounds

route.get("/places/:id", CatchAsync(showpage));

/*handling the post request*/

route.post(
  "/places",
  isloggedin,
  upload.array("placeimage"),
  validator,
  CatchAsync(makeCamp)
);
// route.post("/campgrounds", upload.array('placeimage'), (req, res) => {

// });
route.get("/places/:id/edit", isloggedin, isAuth, CatchAsync(editpage));
route.put(
  "/places/:id/edit",
  upload.array("placeimage"),
  validator,
  CatchAsync(updateCamp)
);

//deleting the campground
route.delete(
  "/places/:id/delete",
  isloggedin,
  isAuth,
  CatchAsync(deleteop)
);

module.exports = route;
