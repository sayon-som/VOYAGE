const mongoose = require("mongoose");
//getting the model

const axios=require('axios');
const Campground = require("../models/CampGround");
//connecting the database
const cities=require("./cities");
const {places,descriptors}=require('./seedhelpers');
mongoose
  .connect("mongodb://localhost:27017/yelp-camp")
  .then((data) => console.log("database connected successfully"))
  .catch((e) => {
    Console.log("error");
  });
//
async function seedImg() {
  try {
    const resp = await axios.get('https://api.unsplash.com/photos/random', {
      params: {
        client_id:'k4e7Y8jhecFbZONkWHKlO3yDKM-YLpYEwGZw0JeaIDc',
        collections: 1114848,
      },
    })
    return resp.data.urls.small
  } catch (err) {
    console.error(err)
  }
}
//checking with a async function
const rand_array=arr=>arr[Math.floor(Math.random()*arr.length)];
const seedDB=async()=>{
await Campground.deleteMany({});
for(let i=0;i<50;i++){
const rand_city=Math.floor((Math.random()*1000));
const price=Math.floor(Math.random()*1000);
const new_data = new Campground({
  location: `${cities[rand_city].city} ${cities[rand_city].state}`,
  title: `${rand_array(descriptors)} ${rand_array(places)}`,
  price:price,
  image:await seedImg(),
  description:'llorem ip asd dasdhasada dskjdkads dahdajdpidajf fiusfijfdf'
  
});
await new_data.save();


}
}
seedDB().then(()=>{mongoose.connection.close()});
