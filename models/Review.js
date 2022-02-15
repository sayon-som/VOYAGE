const mongoose= require("mongoose");

//defining the review model schema
 const review_schema=new mongoose.Schema({
     body:String,
     rating:Number,

 });
 
const Review=mongoose.model("Review",review_schema);
module.exports=Review;