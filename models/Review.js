const mongoose= require("mongoose");

//defining the review model schema
 const review_schema=new mongoose.Schema({
     body:String,
     rating:Number,
     author:{
         type:mongoose.Schema.Types.ObjectId,
         ref:'User'
     }

 });
 
const Review=mongoose.model("Review",review_schema);
module.exports=Review;