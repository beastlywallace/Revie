import express from "express";
import { auth } from "../middleware/auth";
import {
  createReviews,
  getReview,
  upDateReview,
  getReviewsByRecent,
  getReviewsByRating,
} from "../controller/reviewController";
import {
  getSingleReviewByRecent,
  createVisitorReviews,
  sortSingleReviewByRating,
} from "../controller/visitorController";
const router = express.Router();

router.get("/", (req, res) => {
  return res.status(200).json({
   message:  "welcome to Revie wow!"
  });
});
router.post("/create", auth, createReviews);
router.patch("/update/:id", auth, upDateReview);
router.get("/getReview", getReview);
router.get("/getonlyreviewByRating/:id", sortSingleReviewByRating);
router.get("/getSortedByRecent", getReviewsByRecent);
router.get("/getSortedByRating", getReviewsByRating);
router.get("/getSingleReviewByRecent/:id", getSingleReviewByRecent);
router.post("/createVisitorReviews", createVisitorReviews);

export default router;
