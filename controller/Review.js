//adding the models
const Campground = require("../models/CampGround");
const review_model = require("../models/Review");
module.exports.createReview = async (req, res) => {
  const campground = await Campground.findById(req.params.id);

  const { range, message } = req.body;

  const review = new review_model({
    body: message,
    rating: range,
  });
  review.author = req.user._id;

  campground.reviews.push(review);
  await review.save();
  await campground.save();
  //adding a splash for a new review
  req.flash("success", "you have successfully submitted your review");
  res.redirect(`/places/${req.params.id}`);
};
//deleting the reviews
module.exports.deletereview = async (req, res) => {
  const { id, reviewsId } = req.params;
  const see = await Campground.findByIdAndUpdate(id, {
    $pull: { reviews: reviewsId },
  });
  const set = await review_model.findOneAndDelete(reviewsId);
  //adding the flash
  req.flash("success", "Review removed");

  res.redirect(`/places/${id}`);
};
