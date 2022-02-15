const mongoose=require('mongoose');
const { id } = require('../schema');
const Schema=mongoose.Schema;
const review=require("./Review")
const CampGroundSchema = new Schema({
  title: String,
  location: String,

  image: String,
  price: Number,
  description: String,

  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: review,
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
