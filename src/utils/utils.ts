import Joi from "joi";
import jwt from "jsonwebtoken";

export const createReviewSchema = Joi.object().keys({
  title: Joi.string().required(),
  address: Joi.string().required(),
  reviews: Joi.string().required(),
  image: Joi.string(),
  video: Joi.string(),
});
export const visitorReviewSchema = Joi.object().keys({
  rating: Joi.number().integer()
      .min(0)
      .max(5)
      .required(),
  review: Joi.string().required(),
  houseId: Joi.string().required(),
});

export const updateReviewSchema = Joi.object().keys({
  title: Joi.string(),
  address: Joi.string(),
  reviews: Joi.string(),
  image: Joi.string(),
  video: Joi.string(),
});
export const registerSchema = Joi.object()
  .keys({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    username: Joi.string().required(),
    email: Joi.string().trim().lowercase().required(),
    phonenumber: Joi.string()
      .length(11)
      .pattern(/^[0-9]+$/)
      .required(),
    password: Joi.string()
      .regex(/^[a-zA-Z0-9]{3,30}$/)
      .required(),
    confirm_password: Joi.ref("password"),
  })
  .with("password", "confirm_password");

export const loginSchema = Joi.object().keys({
  email: Joi.string().trim().lowercase().required(),
  password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
});

//Generate token
export const generateToken = (user: { [key: string]: unknown }): unknown => {
  const pass = process.env.JWT_SECRET as string;
  return jwt.sign(user, pass, { expiresIn: "7d" });
};

export const options = {
  abortEarly: false,
  errors: {
    wrap: {
      label: "",
    },
  },
};
