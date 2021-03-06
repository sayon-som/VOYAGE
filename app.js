if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// console.log(process.env.SAYON);
const helmet = require("helmet");
//connection to the mongo uri
const db_uri = process.env.MONGO_URI;
//for mongoose injection
const express_mongoose_sanitize = require("express-mongo-sanitize");
const express = require("express");
const mongoose = require("mongoose");
//"mongodb://localhost:27017/yelp-camp")
const db_url = process.env.MONGO_URI || "mongodb://localhost:27017/yelp-camp";
mongoose
  .connect(db_url)
  .then((data) => console.log("database connected successfully"))
  .catch((e) => {
    Console.log("error");
  });
const path = require("path");
const app = express();
//requiring the sessions
const session = require("express-session");

//storing session in the mongoatlas

const MongoStore = require("connect-mongo")(session);

//requiring flash
const flash = require("connect-flash");
const sec = process.env.SECRET || "hello this is secret";
const store = new MongoStore({
  url: db_url,
  secret: sec,
  touchAfter: 24 * 60 * 60,
});
store.on("error", (e) => {
  console.log(e);
});
const sessionConfig = {
  store,
  secret: sec,
  resave: false,
  saveUninitialized: true,
  cookie: {
    name: "lightyagami",
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};
const Usermodel = require("./models/User");
const routes = require("./routes/CampgroundRouter");
const rroutes = require("./routes/ReviewRoute");

const review_model = require("./models/Review.js");
//getting the error class
const ExpressError = require("./utils/ExpressErrors");
app.use(session(sessionConfig));
app.use(flash());
//requiring the routers

//using the hemlet middleware
// app.use(helmet()); //including this breaks the CSP

const scriptSrcUrls = [
  "https://stackpath.bootstrapcdn.com/",
  "https://api.tiles.mapbox.com/",
  "https://api.mapbox.com/",
  "https://kit.fontawesome.com/",
  "https://cdnjs.cloudflare.com/",
  "https://cdn.jsdelivr.net/",
  "https://res.cloudinary.com/dwvwzlueg/",
];
const styleSrcUrls = [
  "https://kit-free.fontawesome.com/",
  "https://stackpath.bootstrapcdn.com/",
  "https://api.mapbox.com/",
  "https://api.tiles.mapbox.com/",
  "https://fonts.googleapis.com/",
  "https://use.fontawesome.com/",
  "https://cdn.jsdelivr.net/",
  "https://res.cloudinary.com/dwvwzlueg/",
];
const connectSrcUrls = [
  "https://*.tiles.mapbox.com",
  "https://api.mapbox.com",
  "https://events.mapbox.com",
  "https://res.cloudinary.com/dwvwzlueg/",
];
const fontSrcUrls = ["https://res.cloudinary.com/dwvwzlueg/"];

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: [],
      connectSrc: ["'self'", ...connectSrcUrls],
      scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
      styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
      workerSrc: ["'self'", "blob:"],
      objectSrc: [],
      imgSrc: [
        "'self'",
        "blob:",
        "data:",
        "https://res.cloudinary.com/dwvwzlueg/", //SHOULD MATCH YOUR CLOUDINARY ACCOUNT!
        "https://images.unsplash.com/",
      ],
      fontSrc: ["'self'", ...fontSrcUrls],
      mediaSrc: ["https://res.cloudinary.com/dwvwzlueg/"],
      childSrc: ["blob:"],
    },
  })
);

//getting the review model

//getting the model
//for the data validation
const joi = require("joi");

const joi_schema = require("./schema.js");
const review_schema = require("./reviewschema.js");
//using the ejs mate template

const ejs = require("ejs-mate");
const CatchAsync = require("./utils/CatchAsync");
const Campground = require("./models/CampGround.js");
//requiring passport
const passport = require("passport");
const localstrategy = require("passport-local");

const methodOverride = require("method-override"); //for the method override
const { Console } = require("console");
const { nextTick, ppid } = require("process");
const res = require("express/lib/response");
const { string } = require("joi");
const Review = require("./models/Review.js");
//getting the user route
const UserRoute = require("./routes/User.js");
const { id } = require("./schema.js");
//for getting the body from the post request
app.use(express.urlencoded({ extended: true }));

app.engine("ejs", ejs);
app.set("view enjine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new localstrategy(Usermodel.authenticate()));

//storing and unstoring user
passport.serializeUser(Usermodel.serializeUser());
passport.deserializeUser(Usermodel.deserializeUser());

//using the mongo sanitize ckage
app.use(express_mongoose_sanitize());

//for handling the flash operations
app.use((req, res, next) => {
  //storing the return to url

  //creating the local for hiding and viewing functionalitites depending on the users choice

  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

//serving the public assets
app.use(express.static(path.join(__dirname, "public")));

//for the uuid
app.use(methodOverride("__method"));

//making the middleware function

//creating the basic home route

//review validator

// const r_validator = (req, res, next) => {
//   //validating the data being passed

//   const { error } = review_schema.validate(req.body.review);
//   if (error) {
//     const msg = error.details.map((e) => e.message).join(",");
//     throw new ExpressError(msg, 400);
//   } else {
//     next();
//   }
// };

//for the home route
app.get("/", (req, res) => {
  res.render("home.ejs");
});

//adding new user
// app.get("/fakeuser",async(req,res)=>{
//   const user= new Usermodel({
//     email:"hello@gmial.com",
//     username:"Sayon"

//   })
//  const new_user=await  Usermodel.register(user,"123456");
//  res.send(new_user);
// })
//for the user route
app.use("/", UserRoute);

//for the campground router part
app.use("/", routes);

//for the review router part

app.use("/", rroutes);

// app.get("/makecamp",async (req,res)=>{
//     const new_camp= new Campground({title:"mexico",price:"$160",description:"good",location:"florida"});
//     await new_camp
//       .save()
//       .then(() => {
//         console.log("inserted");
//       })
//       .catch((e) => {
//         console.log(err);
//       });;

// })
// //showing all the titles of the campgrounds
// app.get("/campgrounds",async(req,res)=>{
// const info=await Campground.find({});
// res.render("campgrounds/index.ejs",{info})
// })

// //adding a new campground

// app.get("/campgrounds/new",(req,res)=>{
//   res.render("campgrounds/new.ejs");
// })

// /*handling the post request*/

// app.post("/campgrounds",validator,CatchAsync(async(req,res)=>{
//   //defining the joi schema

//   const data=req.body;
//   const new_camp= Campground({location:data.location,title:data.title});
// await new_camp.save();
// res.redirect("/campgrounds");
// }
// )
// )

// //POSTING THE REVIEWS:

// app.post("/campgrounds/:id/reviews",r_validator,CatchAsync(async(req,res)=>{
// const  campground= await Campground.findById(req.params.id);

// const {range,message}=req.body;

// const review= new review_model(

// {
//   body:message,
//   rating:range
// }  );

// campground.reviews.push(review);
// await review.save();
// await campground.save();
// res.redirect(`/campgrounds/${req.params.id}`);
// }))

// //deleting the reviews:)

// app.delete("/campgrounds/:id/reviews/:reviewsId",CatchAsync(async(req,res)=>{
// const {id,reviewsId}=req.params;
// const see=await Campground.findByIdAndUpdate(id,{$pull:{reviews:reviewsId}});
// const set=await review_model.findOneAndDelete(reviewsId);

// res.redirect(`/campgrounds/${id}`);
// }))

//editing and updating the form
// app.get("/campgrounds/:id/edit",CatchAsync(async(req,res)=>{

//   const data=await Campground.findById(req.params.id);
//   const {id}=req.params;
//   res.render("campgrounds/edit.ejs",{id});
// }))
// app.put("/campgrounds/:id/edit",validator,CatchAsync(async (req,res)=>{
//   const {id}=req.params;
//   const get=req.body;

//   const up_data=await Campground.findOneAndUpdate({"_id":id},{$set:{location:get.location,title:get.title,price:get.price,description:get.description}});
//   res.redirect("/campgrounds");
// }))

// //deleting the campground
// app.delete("/campgrounds/:id/delete",async(req,res)=>{
//   const {id}=req.params;
//   const del_camp=await Campground.findOneAndDelete({"_id":id});
//   res.redirect("/campgrounds");

// })
// //showing all the campgrounds
// app.get("/campgrounds/:id",async(req,res)=>{

//   const data = await Campground.findById(req.params.id).populate('reviews');
//   //data contains all the reviews

//   res.render("campgrounds/show.ejs",{data});
// })
app.all("*", (req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});

app.use((err, req, res, next) => {
  const { message = "got a error buddy!!!!!!!", status = 400 } = err;
  if (!err.message) err.message = "something went wrong";
  res.status(status).render("error.ejs", { err });
});
//server response
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`listening at port ${PORT}`);
});
