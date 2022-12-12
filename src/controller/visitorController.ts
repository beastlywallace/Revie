import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import { ReviewInstance } from "../model/reviewModel";
import { UserInstance } from "../model/userModel";
import {
  createReviewSchema,
  options,
  updateReviewSchema,
} from "../utils/utils";

import { VisitorsInstance } from "../model/visitorsModel";

export async function createVisitorReviews(
  req: Request | any,
  res: Response,
  next: NextFunction
) {
  const id = uuidv4();
  try {
    const { houseId, rating, review } = req.body;
    const house = await ReviewInstance.findOne({ where: { id: houseId } });

    if (!house) {
      return res.status(401).json({
        msg: " Sorry this house does not exist",
      });
    }
    const record = await VisitorsInstance.create({
      id,
      rating: +rating,
      review,
      houseId,
    });

    return res.status(201).json({
      msg: "You have successfully rated a house",
      record,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      msg: "nawa for you o",
      route: "/create",
    });
  }
}

export async function getSingleReview(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const record = await ReviewInstance.findOne({
      where: { id },
      include: [
        {
          model: VisitorsInstance,
          as: "visitor_review",
        },
      ],
    });
    return res.status(200).json({
      msg: "Successfully gotten a required review",
      record,
    });
  } catch (error) {
    res.status(500).json({
      msg: "failed to read single Review",
      route: "/read/:id",
    });
  }
}
export async function getSingleReviewV(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const record = await VisitorsInstance.findAll({
      where: { houseId: id },
      order: [["rating", "DESC"]],
    });
    return res.status(200).json({
      msg: "Successfully gotten a required review",
      record,
    });
  } catch (error) {
    res.status(500).json({
      msg: "failed to read single Review",
      route: "/read/:id",
    });
  }
}
//
