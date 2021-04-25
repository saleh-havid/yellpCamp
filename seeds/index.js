const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/camground");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => console.log("Database Connected"));

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 500; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "607fd50844e5f73528883efe",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      geometry: { type: 'Point', coordinates: [cities[random1000].longitude, cities[random1000].latitude ] },
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur laudantium, doloribus suscipit modi magni nisi sapiente illo totam voluptates dignissimos obcaecati libero quas? Beatae optio, perspiciatis delectus eos magni a?",
      price,
      images: [
        {
          url:
            "https://res.cloudinary.com/dtqxitu79/image/upload/v1619179484/YelpCamp/elwesx4qbxleaeklideq.jpg",
          filename: "YelpCamp/elwesx4qbxleaeklideq",
        },
        {
          url:
            "https://res.cloudinary.com/dtqxitu79/image/upload/v1619186428/YelpCamp/firljdjx0zzywy5kogbx.jpg",
          filename: "YelpCamp/firljdjx0zzywy5kogbx",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
