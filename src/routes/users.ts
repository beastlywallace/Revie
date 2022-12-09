import express, {Request, Response ,NextFunction } from 'express';
const router = express.Router();

/* GET users listing. */
router.get("/", function (req: Request, res: Response, next: NextFunction) {
  console.log("wally")
  res.status(200).json({ "solo": "respondtt with a resource"});
});

export default router;
