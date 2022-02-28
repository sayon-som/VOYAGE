const mongoose=require('mongoose');
const { id } = require('../schema');
const Schema=mongoose.Schema;
const review=require("./Review");
const user=require("./User");
const CampGroundSchema = new Schema({
  title: String,
  location: String,

  images:[
    {
    url:String,
filename:String
    }
  ],
  price: Number,
  description: String,
  author:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
  }
,
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Review'
    },
  ],
});
//mongoose middleware
CampGroundSchema.post("findOneAndDelete", async function(data){
    if(data){
        await review.deleteMany({
            _id:{
                $in:data.reviews
            }
        })
    }

});
module.exports=mongoose.model("Campground",CampGroundSchema);
