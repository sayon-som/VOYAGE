const express = require("express");
const Router = express.Router();
const User = require("../models/User");
const CatchAsync = require("../utils/CatchAsync");
const passport = require("passport");
//creating a local middleware
const app = express();

Router.get("/register", (req, res) => {
  res.render("../views/User/register.ejs");
});
Router.post(
  "/register",

  CatchAsync(async (req, res, next) => {
    //implementing the new try catch situation
    try {
      const { email, username, password } = req.body;
      const new_user = new User({
        email: email,
        username: username,
      });
      const registered_user = await User.register(new_user, password);
      req.login(registered_user, (err) => {
        if (!err) {
          req.flash("success", "welcome to voyage");
          res.redirect("/places");
        } else {
          next(err);
        }
      });
    } catch (err) {
      req.flash("error", err.message);
      res.redirect("/register");
    }
  })
);

//implementing the Login functionality

Router.get("/login", (req, res) => {
  res.render("User/Login.ejs");
});
Router.post(
  "/login",

  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  (req, res) => {
    //authenticated properly
    //got the id of the logged in user
    res.locals.user = req.user;

    req.flash("success", "Welcome back to Voyage");
    const returnt = "/places";

    res.redirect(returnt);
  }
);
Router.get("/logout", (req, res) => {
  req.logOut();
  req.flash("sucess", "You are successfully logged out");
  res.redirect("/places");
});

module.exports = Router;
