const express = require("express");
const route = express.Router();
const CatchAsync = require("../utils/CatchAsync");
const ExpressError = require("../utils/ExpressErrors");
const Campground = require("../models/CampGround");
const joi = require("joi");

const joi_schema = require("../schema");
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
//for the home route
route.get("/",(req,res)=>{
  res.redirect("/campgrounds");
})
route.get("/makecamp", async (req, res) => {
  const new_camp = new Campground({
    title: "mexico",
    price: "$160",
    description: "good",
    location: "florida",
  });
  await new_camp
    .save()
    .then(() => {
      console.log("inserted");
    })
    .catch((e) => {
      console.log(err);
    });
});
route.get("/makecamp", async (req, res) => {
  const new_camp = new Campground({
    title: "mexico",
    price: "$160",
    description: "good",
    location: "florida",
  });
  await new_camp
    .save()
    .then(() => {
      console.log("inserted");
    })
    .catch((e) => {
      console.log(err);
    });
});
route.get("/campgrounds", async (req, res) => {
  const info = await Campground.find({});
  res.render("campgrounds/index.ejs", { info });
});

//adding a new campground

route.get("/campgrounds/new", (req, res) => {
  res.render("campgrounds/new.ejs");
});

/*handling the post request*/

route.post(
  "/campgrounds",
validator,
  CatchAsync(async (req, res) => {
    //defining the joi schema

    const data = req.body;
    
    const new_camp = new Campground(
      data
    );
   
    await new_camp.save();
    //generate the flashx 
    req.flash("success", "Your New Campground is ready");
    res.redirect("/campgrounds");
  })
);
route.get(
  "/campgrounds/:id/edit",
  CatchAsync(async (req, res) => {
    const data = await Campground.findById(req.params.id);
    const { id } = req.params;
    if (!data) {
      req.flash("error", "Your campground is not found");
      return res.redirect("/campgrounds");
    }
    res.render("campgrounds/edit.ejs", { id });
  })
);
route.put(
  "/campgrounds/:id/edit",
  validator,
  CatchAsync(async (req, res) => {
    const { id } = req.params;
    const get = req.body;

    const up_data = await Campground.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          location: get.location,
          title: get.title,
          price: get.price,
          description: get.description,
        },
      }
    );
    req.flash("success","Hey your campground is successgully updated");
    res.redirect("/campgrounds");
  })
);

//deleting the campground
route.delete("/campgrounds/:id/delete", async (req, res) => {
  const { id } = req.params;
  const del_camp = await Campground.findByIdAndDelete(id);
  //adding the flash
  req.flash("success","Removed the Campground");  
  res.redirect("/campgrounds");
});
//showing all the campgrounds
route.get("/campgrounds/:id", async (req, res) => {
  const data = await Campground.findById(req.params.id).populate("reviews");
  //data contains all the reviews
//adding the flash if the campground is not found
if(!data){
  req.flash("error","Your campground is not found");
  return res.redirect("/campgrounds");
}
  res.render("campgrounds/show.ejs", { data });
});

module.exports = route;
