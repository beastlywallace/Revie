import express, {Request, Response ,NextFunction } from 'express';
import {
  RegisterUser,
  LoginUser,
  // getUsers,
} from "../controller/usercontroller";
const router = express.Router();


router.post("/login", LoginUser);
router.post("/signup", RegisterUser);
// router.get("/allusers", getUsers);

export default router;
