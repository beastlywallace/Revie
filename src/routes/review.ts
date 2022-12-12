import express, { Request, Response, NextFunction } from 'express';
import { auth } from "../middleware/auth";
import {
  createReviews,
  getReview,
  upDateReview,
  getReviewsByRecent,
  getReviewsByRating,
} from "../controller/reviewController";
const router = express.Router();

/* GET home page. */
router.get('/', function (req: Request, res: Response, next: NextFunction) {
  console.log("started")
  res.render('index', { title: 'sucesful' });
});
router.post("/create", auth, createReviews);
router.patch("/update/:id", auth, upDateReview);
router.get("/getReview", getReview);
router.get("/getSortedByRecent", getReviewsByRecent);
router.get("/getSortedByRating", getReviewsByRating);


export default router;
