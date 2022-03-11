const Campground=require("../models/CampGround");
const {cloudinary}=require("../cloudinary/index");
module.exports.index= async(req, res) => {
  const info = await Campground.find({});
  res.render("campgrounds/index.ejs", { info });
};

module.exports.newCampground = (req, res) => {
  res.render("campgrounds/new.ejs");
};

module.exports.makeCamp = async (req, res) => {
  //defining the joi schema

  const data = req.body;

  const new_camp = new Campground(data);
  //  new_camp.author=req.user.
  //generate the flashx
   new_camp.author = req.user._id;
  new_camp.images=req.files.map((data)=>({
    url:data.path,
    filename:data.filename
  })

)

 

  await new_camp.save();
  req.flash("success", "Your New Campground is ready");
  res.redirect("/campgrounds");
};

module.exports.showpage = async (req, res) => {
  const data = await Campground.findById(req.params.id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("author");

  //data contains all the reviews
  //adding the flash if the campground is not found

  if (!data) {
    req.flash("error", "Your campground is not found");
    return res.redirect("/campgrounds");
  }
 
  res.render("campgrounds/show.ejs", { data });
};

module.exports.editpage = async (req, res) => {
  const data = await Campground.findById(req.params.id);
  const { id } = req.params;
  if (!data) {
    req.flash("error", "Your campground is not found");
    return res.redirect("/campgrounds");
  }

  res.render("campgrounds/edit.ejs", {data});
};

//update campgrounds
module.exports.updateCamp = async (req, res) => {
  const { id } = req.params;
  
  const get = req.body;
  
  //logic for restrictin the use from editing


  const up_data = await Campground.findByIdAndUpdate(
    { _id: id },
    {
      $set: {
        location: get.location,
        title: get.title,
        price: get.price,
        description: get.description,
      },
    }
  );
  const images=req.files.map((data)=>({url:data.path,filename:data.filename}));
  
  up_data.images.push(...images);

  await up_data.save();
//deleting the selected images foer the edited form
if(req.body.deleteimages){
  //deleting from the cloudinary storage
  for(let i in req.body.deleteimages){
    await cloudinary.uploader.destroy(i);
  }

await up_data.updateOne({$pull:{images:{filename:{$in:req.body.deleteimages}}}});
}



  req.flash("success", "Hey your campground is successfully updated");
  res.redirect("/campgrounds");
};
//deleting the campgrounds
module.exports.deleteop=async (req, res) => {
    const data = Campground.findById(req.params.id);
    //restricting user for deleting the place without permission

    const del_camp = await Campground.findByIdAndDelete(req.params.id);

    //adding the flash
    req.flash("success", "Removed the Campground");
    res.redirect("/campgrounds");
  };