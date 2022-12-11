import express, { Request, Response, NextFunction } from 'express';
import { auth } from "../middleware/auth";
import { createReviews } from "../controller/reviewController";
const router = express.Router();

/* GET home page. */
router.get('/', function (req: Request, res: Response, next: NextFunction) {
  console.log("started")
  res.render('index', { title: 'sucesful' });
});
router.post("/create", auth, createReviews);

export default router;
