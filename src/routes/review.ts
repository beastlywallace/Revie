import express, { Request, Response, NextFunction } from 'express';
import { auth } from "../middleware/auth";
import { Reviews } from "../controller/reviewController";
const router = express.Router();

/* GET home page. */
router.get('/', function (req: Request, res: Response, next: NextFunction) {
  console.log("started")
  res.render('index', { title: 'sucesful' });
});
router.post("/create", auth, Reviews);

export default router;
