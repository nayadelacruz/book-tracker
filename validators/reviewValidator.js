import { body } from "express-validator";

export const createReviewRules = [
  body("rating")
    .isInt({ min: 1, max: 5 })
    .withMessage("Rating must be an integer between 1 and 5"),

  body("reviewText")
    .isString()
    .withMessage("Review must be a string")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("Review cannot be empty"),
];
