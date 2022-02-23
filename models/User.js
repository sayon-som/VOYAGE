const mongoose=require('mongoose');
const passportlocalmongoose=require("passport-local-mongoose");


const UserSchema=new mongoose.Schema({
    email:{
type:String,
required:true,
unique:true

    }
});
//using the plugin
UserSchema.plugin(passportlocalmongoose);
const User=mongoose.model("User",UserSchema);
module.exports=User;