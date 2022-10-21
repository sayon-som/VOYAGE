const mongoose = require("mongoose");
const { id } = require("../schema");
const Schema = mongoose.Schema;
const review = require("./Review");
const user = require("./User");
const opts = { toJSON: { virtuals: true } };
//defining a separate image schema for the images
const imageSchema = new Schema({
  url: String,
  filename: String,
});
imageSchema.virtual("thumbnail").get(function () {
  return this.url.replace("/upload", "/upload/w_200");
});
const placesSchema = new Schema(
  {
    title: String,
    //for the geojson format of storing the location
    geometry: {
      type: {
        type: String, // Don't do `{ location: { type: String } }`
        enum: ["Point"], // 'location.type' must be 'Point'
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    location: String,

    images: [imageSchema],
    price: Number,
    description: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
  },
  opts
);
//mongoose middleware
places.post("findOneAndDelete", async function (data) {
  if (data) {
    await review.deleteMany({
      _id: {
        $in: data.reviews,
      },
    });
  }
});

//creating the virtual property for the map to render
places.virtual("properties.popuptext").get(function () {
  return `<a href="/places/${this._id}">${this.title}</a>
  <p>${this.description.substring(0, 10)}...</p>`;
});
module.exports = mongoose.model("places", places);
