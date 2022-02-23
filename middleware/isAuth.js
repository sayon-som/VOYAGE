


const CampGround=require('../models/CampGround');

module.exports.isAuth=async(req,res,next)=>{
 const { id } = req.params;
   const data= await CampGround.findById(id);

 if(!data.author.equals(req.user._id)) {
   req.flash("error", "You do not have the authorization to this area");
   return res.redirect("/campgrounds");
 }
next();
}
