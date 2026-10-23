import express from "express";
import { createReview, getReview } from "../controllers/reviews.js";
import { bookIdRules } from "../validators/bookValidator.js";
import { createReviewRules } from "../validators/reviewValidator.js";
import { validateRequest } from "../validators/validate.js";

const router = express.Router();

router.post(
  "/books/:id/reviews",
  bookIdRules,
  createReviewRules,
  validateRequest,
  createReview,
);

router.get("/books/:id/reviews", bookIdRules, validateRequest, getReview);

export default router;
