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
      rating: rating,
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
      msg: "could not place review",
    });
  }
}

export async function getSingleReviewByRecent(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;

    const record = await VisitorsInstance.findAll({
      where: { houseId: id },
      order: [["createdAt", "DESC"]],
    });
    const apartment = await ReviewInstance.findOne({
      where: { id },
    });
    if (record.length === 0) {
      res.status(500).json({
        msg: "house not exist",
      });
    }
    let apartmentTitle = apartment?.dataValues.title;
    return res.status(200).json({
      msg: `Successfully gotten ${apartmentTitle} reviews sorted By Most Recent`,
      record,
    });
  } catch (error) {
    res.status(500).json({
      msg: "failed to read  Review",
      route: "/read/:id",
    });
  }
}

export async function sortSingleReviewByRating(
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
    const apartment = await ReviewInstance.findOne({
      where: { id },
    });
    if (record.length === 0) {
      res.status(500).json({
        msg: "house not exist",
      });
    }
    let apartmentTitle = apartment?.dataValues.title;
    return res.status(200).json({
      msg: `Successfully gotten ${apartmentTitle} reviews sorted By Most Rated`,
      record,
    });
  } catch (error) {
    res.status(500).json({
      msg: "failed to read  Review",
      route: "/read/:id",
    });
  }
}
