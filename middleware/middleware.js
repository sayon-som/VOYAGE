const session=require('express-session');
const isloggedin = (req, res, next) => {
  if (!req.isAuthenticated()) {
      //storing the url of the path where the user was trying to submit his /her choices
      req.session.returnto=req.originalUrl;
    req.flash("error", "You must be signed in first!");
    return res.redirect("/login");
  }
  next();
}
module.exports=isloggedin;