const express = require("express");
const Router = express.Router();
const User = require("../models/User");
const CatchAsync = require("../utils/CatchAsync");
const passport = require("passport");
Router.get("/register", (req, res) => {
  res.render("../views/User/register.ejs");
});
Router.post(
  "/register",
  CatchAsync(async (req, res,next) => {
    //implementing the new try catch situation
    try {
      const { email, username, password } = req.body;
      const new_user = new User({
        email: email,
        username: username,
      });
      const registered_user = await User.register(new_user, password);
      req.login(registered_user,err=>{
          if(!err){
req.flash("success", "welcome to voyage");
res.redirect("/campgrounds");
          }
          else{
next(err);
          }
      })
      
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
    req.flash("success", "Welcome back to Voyage");
    const returnt=req.session.returnto || "/campgrounds";
    console.log(returnt);
    res.redirect(returnt);
  }
);
Router.get("/logout", (req, res) => {
  req.logOut();
  req.flash("sucess", "You are successfully logged out");
  res.redirect("/campgrounds");
});

module.exports = Router;
