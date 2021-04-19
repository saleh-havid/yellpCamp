const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const { urlencoded } = require("express");
const ejsMate = require("ejs-mate");
const Campground = require("./models/camground");
const ExpressError = require("./utils/ExpressError");
const catchAsync = require("./utils/catchAsync");
const methodOverride = require("method-override");
const { campgroundJoiSchema, reviewJoiSchema } = require("./joiSchemas");
const { title } = require("process");
const Review = require("./models/review");
const campgroundsRoutes = require("./routes/campgrounds");
const reviewsRoutes = require("./routes/reviews");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => console.log("Database Connected"));

const app = express();

app.engine("ejs", ejsMate);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.use("/campgrounds", campgroundsRoutes);
app.use("/campgrounds/:id/reviews", reviewsRoutes);

app.get("/", (req, res) => {
  res.render("home");
});

app.all("*", (req, res, next) => {
  next(new ExpressError("Page Not Found!", 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "SOMETHING WENT WRONG";
  res.status(statusCode).render("error", { err });
});

app.listen(3000, () => console.log("Server berjalan di port 3000!"));
