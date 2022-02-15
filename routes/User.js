const express=require('express');
const Router=express.Router();
const User=require("../models/User");
Router.get("/register",(req,res)=>{
    res.render("User/register.ejs");
})

module.exports=Router;