import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import { ReviewInstance } from "../model/reviewModel";
import { UserInstance } from "../model/userModel";
import {
  createReviewSchema,
  options,
  updateReviewSchema,
} from "../utils/utils";
import cloudinary from "cloudinary";

import multer, { FileFilterCallback } from "multer";

export async function createReviews(
  req: Request | any,
  res: Response,
  next: NextFunction
) {
  const id = uuidv4();
  try {
    cloudinary.v2.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUD_API_KEY,
      api_secret: process.env.CLOUD_API_SECRET,
    });

    const verified = req.user; //storing user id  and info of creation  // to know d user performing d operatio..jwt collect d user info
    const validationResult = createReviewSchema.validate(req.body, options);
    if (validationResult.error) {
      return res.status(400).json({
        Error: validationResult.error.details[0].message,
      });
    }

    let result: Record<string, string> = {};

    if (req.body.image) {
      result = await cloudinary.v2.uploader.upload(req.body.image, {
        //formats allowed for download
        allowed_formats: ["jpg", "png", "svg", "jpeg"],
        //generates a new id for each uploaded image
        public_id: "",
        //fold where the images are stored
        folder: "iqube",
      });
    }
    const record = await ReviewInstance.create({
      id,
      ...req.body,
      userId: verified.id,
    });

    console.log(record);

    return res.status(201).json({
      msg: "You have successfully created a review",
      record,
    });
  } catch (err) {
    console.log(err);
    // if (err.error.path) {

    //  }
    return res.status(500).json({
      // msg: "failed to create",

      msg: "check file format",
      route: "/create",
    });
  }
}

export async function upDateReview(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    cloudinary.v2.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUD_API_KEY,
      api_secret: process.env.CLOUD_API_SECRET,
    });

    const { id } = req.params;
    const { reviews, image, video } = req.body;
    const validationResult = updateReviewSchema.validate(req.body, options);
    if (validationResult.error) {
      return res.status(400).json({
        Error: validationResult.error.details[0].message,
      });
    }

    let result: Record<string, string> = {};

    if (req.body.image) {
      result = await cloudinary.v2.uploader.upload(req.body.image, {
        //formats allowed for download
        allowed_formats: ["jpg", "png", "svg", "jpeg"],
        //generates a new id for each uploaded image
        public_id: "",
        //fold where the images are stored
        folder: "iqube",
      });
    }
    //  if (req.body.video) {
    //    result = await cloudinary.v2.uploader.upload(req.body.video, {
    //      //formats allowed for download
    //      allowed_formats: ["3gp", "mp4"],
    //      //generates a new id for each uploaded image
    //      public_id: "",
    //      //fold where the images are stored
    //      folder: "iqube",
    //    });
    //  }

    const record = await ReviewInstance.findOne({ where: { id } });
    if (!record) {
      return res.status(404).json({
        Error: "Cannot find existing todo",
      });
    }
    const updatedrecord = await record.update({
      reviews: reviews,
      image: image,
      video: video,
    });
    return res.status(200).json({
      msg: "You have successfully updated your Review",
      updatedrecord,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "failed to update",
      route: "/update/:id",
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
          attributes: [
            "id",
            "firstname",
            "lastname",
            "username",
            "email",
            "phonenumber",
          ],
          as: "user",
        },
      ],
    });
    return res.status(200).json({
      msg: "You have successfully fetch all Reviews",
      count: record.count,
      record: record.rows,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "failed to read",
      route: "/read",
    });
  }
}
export async function getReviewsByRating(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const record = await ReviewInstance.findAll({
      order: [["rating", "DESC"]],
    });
    return res.status(200).json({
      msg: "You have successfully fetch all Reviews",
      record: record,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "failed to read",
      route: "/read",
    });
  }
}
export async function getReviewsByRecent(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const record = await ReviewInstance.findAll({
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({
      msg: "You have successfully fetch all Reviews",
      record: record,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "failed to Get Reviews",
      route: "/read",
    });
  }
}