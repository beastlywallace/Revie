import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import { ReviewInstance } from "../model/reviewModel";
import { UserInstance } from "../model/userModel";
import {
  createReviewSchema,
  options,
  updateReviewSchema,
} from "../utils/utils";



export async function Reviews(
    req: Request | any,
    res: Response,
    next: NextFunction
) {
    const id = uuidv4();
    try {

    
  const verified = req.user; //storing user id  and info of creation  // to know d user performing d operatio..jwt collect d user info
  const validationResult = createReviewSchema.validate(req.body, options);
  if (validationResult.error) {
    return res.status(400).json({
      Error: validationResult.error.details[0].message,
    });
  }
    const record = await ReviewInstance.create({
      id,
      ...req.body,
      userId: verified.id,
    });
        
        console.log(record);
    
    res.status(201).json({
      msg: "You have successfully created a review",
      record,
    });
    } catch (err) {
      console.log(err)
  res.status(500).json({
    msg: "failed to create",
    route: "/create",
  });
}
}