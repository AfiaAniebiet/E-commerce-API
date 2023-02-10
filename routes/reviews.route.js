const express = require("express");
const router = express.Router();

const { authUser } = require("../middleware/authentication");
const reviewsController = require("../controllers/review.controller");

router.route("/").get(reviewsController.getAllReviews).post(authUser, reviewsController.createReview);

router
  .route("/:id")
  .get(reviewsController.getSingleReview)
  .patch(authUser, reviewsController.updateReview)
  .delete(authUser, reviewsController.deleteReview);

module.exports = router;
