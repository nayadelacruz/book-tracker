import express from "express";
import { validateRequest } from "../validators/validate.js";
import {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBookController,
} from "../controllers/books.js";
import {
  updateBookRules,
  bookIdRules,
  createBookRules,
} from "../validators/bookValidator.js";

const router = express.Router();
//Working routes
router.get("/books", getBooks);
router.get("/books/:id", bookIdRules, validateRequest, getBook);
router.post("/new-book", createBookRules, validateRequest, createBook);
router.put(
  "/books/:id",
  bookIdRules,
  updateBookRules,
  validateRequest,
  updateBook,
);
router.delete("/books/:id", bookIdRules, validateRequest, deleteBookController);

export default router;
