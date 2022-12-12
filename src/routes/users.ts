import express, {Request, Response ,NextFunction } from 'express';
import {
  RegisterUser,
  LoginUser,
  // getUsers,
} from "../controller/usercontroller";
const router = express.Router();

/* GET users listing. */
router.get("/", function (req: Request, res: Response, next: NextFunction) {
  console.log("wally")
  res.status(200).json({ "solo": "respondtt with a resource"});
});
router.post("/login", LoginUser);
router.post("/signup", RegisterUser);
// router.get("/allusers", getUsers);

export default router;
