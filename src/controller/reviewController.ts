import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import { ReviewInstance } from "../model/reviewModel";
import { UserInstance } from "../model/userModel";
import {
  createReviewSchema,
  options,
  updateReviewSchema,
} from "../utils/utils";



export async function createReviews(
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


export async function getReview(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const limit = req.query?.limit as number | undefined;
    const offset = req.query?.offset as number | undefined;
    //  const record = await TodoInstance.findAll({where: {},limit, offset})
    const record = await ReviewInstance.findAndCountAll({
      limit,
      offset,
      include: [
        {
          model: UserInstance,
          attributes: ["id", "firstname", "lastname","username", "email", "phonenumber"],
          as: "user",
        },
      ],
    });
    res.status(200).json({
      msg: "You have successfully fetch all Reviews",
      count: record.count,
      record: record.rows,
    });
  } catch (error) {
    res.status(500).json({
      msg: "failed to read",
      route: "/read",
    });
  }
}