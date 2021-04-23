const express = require("express");
const router = express.Router({ mergeParams: true });
const Campground = require("../models/camground");
const Review = require("../models/review");
const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/ExpressError");
const { validateReview, isLoggedin, isReviewAuthor } = require("../middleware");
const reviews = require("../controllers/reviews");
const review = require("../models/review");

router.post("/", isLoggedin, validateReview, catchAsync(reviews.createReview));

router.delete(
  "/:reviewId",
  isLoggedin,
  isReviewAuthor,
  catchAsync(reviews.deteleReview)
);

module.exports = router;
