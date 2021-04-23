const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const Campground = require("../models/camground");
const { isLoggedin, isAuthor, validateCampground } = require("../middleware");
const review = require("../models/review");
const campgrounds = require("../controllers/campgrounds");

const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });

router
  .route("/")
  .get(catchAsync(campgrounds.index))
  .post(
    isLoggedin,
    upload.array("image"),
    validateCampground,
    catchAsync(campgrounds.createCampground)
  );

router.get("/new", isLoggedin, campgrounds.renderNewForm);

router
  .route("/:id")
  .get(catchAsync(campgrounds.showCampground))
  .put(
    isLoggedin,
    isAuthor,
    validateCampground,
    catchAsync(campgrounds.updateCampground)
  )
  .delete(isLoggedin, isAuthor, catchAsync(campgrounds.deleteCampground));

router.get(
  "/:id/edit",
  isLoggedin,
  isAuthor,
  catchAsync(campgrounds.renderEditForm)
);

module.exports = router;
